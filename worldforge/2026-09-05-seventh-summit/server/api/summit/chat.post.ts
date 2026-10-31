import { defineEventHandler, readBody } from 'h3'
import { addMessages, type ChatMessage } from '../../utils/chatStore'
import { getChatDatabase } from '../../utils/chatDatabase'
import { HOSTS } from '../../../data/hosts'

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as {
    from?: string
    address?: string | null
    text?: string
  }

  const rawText = typeof body?.text === 'string' ? body.text.trim() : ''
  if (!rawText) {
    return { ok: false, error: 'Cannot transmit an empty message to the floor.' }
  }

  if (rawText.length > 2000) {
    return { ok: false, error: 'Messages must be 2,000 characters or fewer.' }
  }

  const db = getChatDatabase(event)
  const now = new Date()
  const userMsgId = `msg_${crypto.randomUUID()}`
  const userMsg: ChatMessage = {
    id: userMsgId,
    at: now.toISOString(),
    from: typeof body.from === 'string' ? body.from.slice(0, 80) : 'steward',
    fromName: body.from === 'steward' ? 'Steward Vessel' : 'Floor Observer',
    text: rawText,
    kind: 'user',
  }

  const returnedMessages: ChatMessage[] = [userMsg]

  // If a seat or the floor was addressed, generate a council reply
  let targetSeat = null
  if (body.address && body.address !== 'floor') {
    targetSeat = HOSTS.find((h) => String(h.id) === String(body.address))
  }

  const replyTimestamp = now.toISOString()
  const replyId = `msg_${crypto.randomUUID()}`

  if (targetSeat) {
    const seatResponses = [
      `“${targetSeat.voiceSnippet}” The address from ${userMsg.fromName} is registered. We weigh this against Summit proceedings.`,
      `Seat ${targetSeat.id} (${targetSeat.name}) recognizes the speaker: “${targetSeat.voiceSnippet}”`,
      `${targetSeat.name} acknowledges: Concerning the floor's statement, resonance frequencies indicate alignment with the ${targetSeat.franchise} compact.`,
    ]
    const chosenReply = seatResponses[Math.floor(Math.random() * seatResponses.length)]

    const seatReply: ChatMessage = {
      id: replyId,
      at: replyTimestamp,
      from: targetSeat.name.toLowerCase().replace(/\s+/g, '_'),
      fromName: `${targetSeat.name} [Seat ${String(targetSeat.id).padStart(2, '0')}]`,
      text: chosenReply,
      kind: 'seat',
    }
    returnedMessages.push(seatReply)
  } else {
    // Open floor address: Random council member speaks
    const randomSeat = HOSTS[Math.floor(Math.random() * HOSTS.length)]
    const floorReply: ChatMessage = {
      id: replyId,
      at: replyTimestamp,
      from: randomSeat.name.toLowerCase().replace(/\s+/g, '_'),
      fromName: `${randomSeat.name} [Seat ${String(randomSeat.id).padStart(2, '0')}]`,
      text: `Addressing open floor: “${randomSeat.voiceSnippet}”`,
      kind: 'seat',
    }
    returnedMessages.push(floorReply)
  }

  const storedMessages = await addMessages(db, returnedMessages)

  return {
    ok: true,
    messages: storedMessages,
  }
})
