import { createError, defineEventHandler, getQuery, setHeader } from 'h3'
import { getMessages, parseCursor } from '../../utils/chatStore'
import { getChatDatabase } from '../../utils/chatDatabase'

export default defineEventHandler(async (event) => {
  setHeader(event, 'Cache-Control', 'no-store')
  let since: number
  try {
    since = parseCursor(getQuery(event).since)
  } catch {
    throw createError({ statusCode: 400, statusMessage: 'Invalid chat cursor' })
  }
  return getMessages(getChatDatabase(event), since)
})
