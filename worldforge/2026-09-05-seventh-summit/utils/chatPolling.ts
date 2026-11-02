export interface SequencedMessage { id: string; sequence: number }

export function mergeMessages<T extends SequencedMessage>(current: T[], incoming: T[]): T[] {
  const byId = new Map(current.map((message) => [message.id, message]))
  for (const message of incoming) byId.set(message.id, message)
  return [...byId.values()].sort((a, b) => a.sequence - b.sequence)
}

export function advanceCursor(current: number, next: number): number {
  return Number.isSafeInteger(next) && next >= 0 ? Math.max(current, next) : current
}
