import { test } from 'node:test'
import assert from 'node:assert/strict'
import { DatabaseSync } from 'node:sqlite'
import { readFileSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { addMessages, getMessages, parseCursor, type ChatDatabase, type ChatMessage } from '../server/utils/chatStore.ts'
import { advanceCursor, mergeMessages } from '../utils/chatPolling.ts'

// Execute production SQL against SQLite, including real transactions and constraints.
function database(path = ':memory:') {
  const sqlite = new DatabaseSync(path)
  return {
    sqlite,
    prepare(sql: string) {
      return { sql, values: [] as unknown[], bind(...values: unknown[]) { return { ...this, values } } }
    },
    async batch(statements: any[]) {
      sqlite.exec('BEGIN')
      try {
        const results = statements.map(({ sql, values }) => ({ results: sqlite.prepare(sql).all(...values) }))
        sqlite.exec('COMMIT')
        return results
      } catch (error) { sqlite.exec('ROLLBACK'); throw error }
    },
  }
}
function migrate(db: ReturnType<typeof database>) {
  db.sqlite.exec(readFileSync(new URL('../migrations/0001_chat.sql', import.meta.url), 'utf8'))
}
function message(id: string, at = '2026-10-31T00:00:00.000Z'): ChatMessage {
  return { id, at, from: 'steward', fromName: 'Steward Vessel', text: id, kind: 'user' }
}

test('shared persisted history survives separate connections and store recreation', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'summit-'))
  try {
    const path = join(dir, 'chat.sqlite')
    const first = database(path); migrate(first)
    await addMessages(first as ChatDatabase, [message('persisted')])
    const second = database(path)
    assert.equal((await getMessages(second as ChatDatabase)).messages.at(-1)?.id, 'persisted')
    first.sqlite.close(); second.sqlite.close()
    const restarted = database(path)
    assert.equal((await getMessages(restarted as ChatDatabase)).total, 6)
    restarted.sqlite.close()
  } finally { rmSync(dir, { recursive: true }) }
})

test('cursor follows committed sequence despite equal, future, or backwards timestamps', async () => {
  const db = database(); migrate(db)
  const initial = await getMessages(db as ChatDatabase)
  await addMessages(db as ChatDatabase, [message('one'), message('reply', '2099-01-01T00:00:00.000Z')])
  const poll = await getMessages(db as ChatDatabase, initial.next)
  await addMessages(db as ChatDatabase, [message('two'), message('same-time')])
  const next = await getMessages(db as ChatDatabase, poll.next)
  assert.deepEqual(next.messages.map(m => m.id), ['two', 'same-time'])
  const empty = await getMessages(db as ChatDatabase, next.next)
  assert.equal(empty.next, next.next)
  assert.deepEqual(empty.messages, [])
  db.sqlite.close()
})

test('atomic append rolls back the whole exchange on failure', async () => {
  const db = database(); migrate(db)
  await assert.rejects(addMessages(db as ChatDatabase, [message('new'), message('msg_001')]))
  assert.equal((await getMessages(db as ChatDatabase)).total, 5)
  db.sqlite.close()
})

test('retention keeps 150 rows and sequence never resets', async () => {
  const db = database(); migrate(db)
  for (let i = 0; i < 160; i++) await addMessages(db as ChatDatabase, [message(`new-${i}`)])
  const poll = await getMessages(db as ChatDatabase)
  assert.equal(poll.total, 150)
  assert.equal(poll.messages[0].id, 'new-10')
  assert.equal(poll.next, 165)
  await addMessages(db as ChatDatabase, [message('latest')])
  assert.equal((await getMessages(db as ChatDatabase, poll.next)).next, 166)
  db.sqlite.close()
})

test('POST does not advance polling past unseen participant messages; merge is ordered and deduplicated', async () => {
  const db = database(); migrate(db)
  const initial = await getMessages(db as ChatDatabase)
  await addMessages(db as ChatDatabase, [message('other-user')])
  const sent = await addMessages(db as ChatDatabase, [message('my-user'), message('my-reply')])
  let visible = mergeMessages(initial.messages, sent)
  const poll = await getMessages(db as ChatDatabase, initial.next)
  visible = mergeMessages(visible, poll.messages)
  assert.deepEqual(visible.slice(-3).map(m => m.id), ['other-user', 'my-user', 'my-reply'])
  assert.equal(advanceCursor(poll.next, initial.next), poll.next)
  db.sqlite.close()
})

test('cursor input is an unsigned safe integer only', () => {
  assert.equal(parseCursor(undefined), 0)
  assert.equal(parseCursor('5'), 5)
  for (const value of ['NaN', '-1', '1.5', '9007199254740992', ['1', '2']]) {
    assert.throws(() => parseCursor(value))
  }
})
