import { defineEventHandler, getQuery } from 'h3'
import { chatStore } from '../../utils/chatStore'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const since = Number(query.since || 0)

  let filtered = chatStore
  if (since > 0) {
    filtered = chatStore.filter((m) => {
      const numId = Number(m.id.replace(/\D/g, '') || 0)
      const timestamp = new Date(m.at).getTime()
      return numId > since || timestamp > since
    })
  }

  const last = chatStore[chatStore.length - 1]
  const next = last ? new Date(last.at).getTime() : Date.now()

  return {
    messages: filtered,
    next,
    total: chatStore.length,
    summit: 'Seventh Galactic Summit',
    floorLive: true,
  }
})
