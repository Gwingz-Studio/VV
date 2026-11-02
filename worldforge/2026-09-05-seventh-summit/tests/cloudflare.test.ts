import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { Miniflare, convertV4MiniflareOptions } from 'miniflare'

const root = 'dist/_worker.js'
const modules = [
  { type: 'ESModule' as const, path: `${root}/index.js` },
  ...readdirSync(root, { recursive: true }).filter((path) => /\.m?js$/.test(String(path)) && path !== 'index.js')
    .map((path) => ({ type: 'ESModule' as const, path: `${root}/${path}` })),
]

// Run the actual built Nitro worker in workerd, with a local D1 binding.
// Run npm run build before this integration test; no remote services are used.
test('Cloudflare worker serves shared D1 chat and preserves endpoint behavior', async () => {
  const worker = new Miniflare(convertV4MiniflareOptions({
    modules,
    compatibilityDate: '2024-11-01',
    compatibilityFlags: ['nodejs_compat'],
    d1Databases: ['SUMMIT_CHAT'],
  }))
  try {
    const db = await worker.getD1Database('SUMMIT_CHAT')
    const migration = readFileSync(new URL('../migrations/0001_chat.sql', import.meta.url), 'utf8')
    // D1 exec's line parser expects statements on one line.
    await db.exec(migration.replace(/^--.*$/gm, '').replace(/\n/g, ' '))
    const get = () => worker.dispatchFetch('https://summit.test/api/summit/chat')
    const initialResponse = await get()
    assert.equal(initialResponse.status, 200)
    assert.equal(initialResponse.headers.get('cache-control'), 'no-store')
    const initial = await initialResponse.json() as any
    assert.equal(initial.total, 5)
    const post = (body: unknown) => worker.dispatchFetch('https://summit.test/api/summit/chat', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
    })
    for (const text of ['', 123, 'x'.repeat(2001)]) {
      assert.equal((await (await post({ text })).json() as any).ok, false)
    }
    const start = Date.now()
    const responses = await Promise.all([
      post({ from: 'steward', address: '1', text: 'Direct address' }),
      post({ from: 'steward', address: null, text: 'Open floor' }),
    ])
    const exchanges = await Promise.all(responses.map(r => r.json())) as any[]
    const all = exchanges.flatMap(e => e.messages)
    assert.equal(new Set(all.map(m => m.id)).size, 4)
    for (const exchange of exchanges) {
      assert.equal(exchange.ok, true)
      assert.deepEqual(exchange.messages.map((m: any) => m.kind), ['user', 'seat'])
      assert.ok(exchange.messages[1].sequence > exchange.messages[0].sequence)
      assert.ok(Date.parse(exchange.messages[1].at) >= start)
      assert.ok(Date.parse(exchange.messages[1].at) <= Date.now())
    }
    const poll = await (await worker.dispatchFetch(`https://summit.test/api/summit/chat?since=${initial.next}`)).json() as any
    assert.equal(poll.messages.length, 4)
    assert.equal(poll.total, 9)
    const empty = await (await worker.dispatchFetch(`https://summit.test/api/summit/chat?since=${poll.next}`)).json() as any
    assert.equal(empty.next, poll.next)
    assert.deepEqual(empty.messages, [])
    assert.equal((await worker.dispatchFetch('https://summit.test/api/summit/chat?since=NaN')).status, 400)
  } finally { await worker.dispose() }
})

test('Cloudflare worker fails explicitly without a database binding', async () => {
  const worker = new Miniflare(convertV4MiniflareOptions({
    modules,
    compatibilityDate: '2024-11-01', compatibilityFlags: ['nodejs_compat'],
  }))
  try {
    assert.equal((await worker.dispatchFetch('https://summit.test/api/summit/chat')).status, 503)
    assert.equal((await worker.dispatchFetch('https://summit.test/api/summit/chat', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: 'test' }),
    })).status, 503)
  } finally { await worker.dispose() }
})
