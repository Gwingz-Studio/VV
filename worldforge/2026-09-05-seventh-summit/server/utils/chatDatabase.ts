import { createError, type H3Event } from 'h3'
import type { ChatDatabase } from './chatStore'

export function getChatDatabase(event: H3Event): ChatDatabase {
  const db = event.context.cloudflare?.env?.SUMMIT_CHAT as ChatDatabase | undefined
  if (!db) {
    throw createError({ statusCode: 503, statusMessage: 'Shared chat storage is not configured.' })
  }
  return db
}
