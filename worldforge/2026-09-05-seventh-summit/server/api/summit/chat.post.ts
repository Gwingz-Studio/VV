import { defineEventHandler, readBody } from 'h3'
import { chatStore, addMessage, type ChatMessage } from '../../utils/chatStore'
import { HOSTS } from '../../../data/hosts'

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as {
    from?: string
    address?: string | null
    text?: string
  }

  const rawText = body?.text?.trim()
  if (!rawText) {
    return { ok: false, error: 'Cannot transmit an empty message to the floor.' }
  }

  const now = new Date()
  const userMsgId = `msg_${Date.now()}`
  const userMsg: ChatMessage = {
    id: userMsgId,
    at: now.toISOString(),
    from: body.from || 'steward',
    fromName: body.from === 'steward' ? 'Steward Vessel' : 'Floor Observer',
    text: rawText,
    kind: 'user',
  }
  addMessage(userMsg)

  const returnedMessages: ChatMessage[] = [userMsg]

  // If a seat or the floor was addressed, generate a council reply
  let targetSeat = null
  if (body.address && body.address !== 'floor') {
    targetSeat = HOSTS.find((h) => String(h.id) === String(body.address))
  }

  const replyTimestamp = new Date(Date.now() + 600).toISOString()
  const replyId = `msg_${Date.now() + 1}`

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
    addMessage(seatReply)
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
    addMessage(floorReply)
    returnedMessages.push(floorReply)
  }

  return {
    ok: true,
    messages: returnedMessages,
  }
})
