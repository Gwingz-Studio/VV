export interface ChatMessage {
  id: string
  at: string
  from: string
  fromName: string
  text: string
  kind: 'user' | 'seat' | 'system'
}

// Minimal structural types keep the store usable in both D1 and SQLite tests.
export interface Statement {
  bind(...values: unknown[]): Statement
}
export interface ChatDatabase {
  prepare(sql: string): Statement
  batch<T>(statements: Statement[]): Promise<{ results: T[] }[]>
}
export interface StoredMessage extends ChatMessage { sequence: number }

const columns = 'sequence, id, at, sender AS "from", sender_name AS fromName, text, kind'

export function parseCursor(value: unknown): number {
  if (value === undefined) return 0
  if (typeof value !== 'string' || !/^\d+$/.test(value)) throw new Error('Invalid chat cursor')
  const cursor = Number(value)
  if (!Number.isSafeInteger(cursor)) throw new Error('Invalid chat cursor')
  return cursor
}

export async function getMessages(db: ChatDatabase, since = 0) {
  // D1 batch reads one consistent snapshot; next comes only from returned rows.
  // No sessions/replicas are used: D1 routes these queries to the primary.
  const [rows, count] = await db.batch<StoredMessage & { total: number }>([
    db.prepare(`SELECT ${columns} FROM chat_messages WHERE sequence > ? ORDER BY sequence`).bind(since),
    db.prepare('SELECT COUNT(*) AS total FROM chat_messages'),
  ])
  return {
    messages: rows.results,
    next: rows.results.at(-1)?.sequence ?? since,
    total: count.results[0].total,
    summit: 'Seventh Galactic Summit',
    floorLive: true,
  }
}

export async function addMessages(db: ChatDatabase, messages: ChatMessage[]) {
  // Both messages and the retention sweep commit together or roll back together.
  const results = await db.batch<StoredMessage>([
    ...messages.map((m) => db.prepare(
      `INSERT INTO chat_messages (id, at, sender, sender_name, text, kind) VALUES (?, ?, ?, ?, ?, ?) RETURNING ${columns}`,
    ).bind(m.id, m.at, m.from, m.fromName, m.text, m.kind)),
    db.prepare('DELETE FROM chat_messages WHERE sequence NOT IN (SELECT sequence FROM chat_messages ORDER BY sequence DESC LIMIT 150)'),
  ])
  return results.slice(0, messages.length).flatMap((result) => result.results)
}
