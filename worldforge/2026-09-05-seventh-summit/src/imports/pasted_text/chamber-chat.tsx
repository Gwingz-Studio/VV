import { useEffect, useRef, useState } from 'react'
import { ATTENDEES } from './attendees'

export type ChatMessage = {
  id: string
  at: string
  from: string
  fromName: string
  text: string
  kind: 'user' | 'seat' | 'system'
}

type Props = {
  launcherUp: boolean
  speakAsId: string
  addressId: string
  onAddressChange: (id: string) => void
}

export function ChamberChat({
  launcherUp,
  speakAsId,
  addressId,
  onAddressChange,
}: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [draft, setDraft] = useState('')
  const [sending, setSending] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const sinceRef = useRef(0)

  useEffect(() => {
    if (!launcherUp) return
    let alive = true
    const pull = async () => {
      try {
        const res = await fetch(
          `/api/summit/chat?since=${sinceRef.current}`,
        )
        if (!res.ok) return
        const data = (await res.json()) as {
          messages: ChatMessage[]
          next: number
        }
        if (!alive) return
        if (data.messages?.length) {
          setMessages((prev) => {
            const seen = new Set(prev.map((m) => m.id))
            const add = data.messages.filter((m) => !seen.has(m.id))
            return add.length ? [...prev, ...add] : prev
          })
        }
        sinceRef.current = data.next ?? sinceRef.current
      } catch {
        /* launcher blip */
      }
    }
    pull()
    const t = window.setInterval(pull, 1200)
    return () => {
      alive = false
      window.clearInterval(t)
    }
  }, [launcherUp])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    const text = draft.trim()
    if (!text || !launcherUp || sending) return
    setSending(true)
    setErr(null)
    setDraft('')
    try {
      const res = await fetch('/api/summit/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: speakAsId,
          address: addressId === 'floor' ? null : addressId,
          text,
        }),
      })
      const data = (await res.json()) as {
        ok?: boolean
        error?: string
        messages?: ChatMessage[]
      }
      if (!res.ok || !data.ok) {
        setErr(data.error || 'Floor rejected that.')
        setDraft(text)
        return
      }
      if (data.messages?.length) {
        setMessages((prev) => {
          const seen = new Set(prev.map((m) => m.id))
          const add = data.messages!.filter((m) => !seen.has(m.id))
          return [...prev, ...add]
        })
        const last = data.messages[data.messages.length - 1]
        const n = Number(last?.id?.replace(/\D/g, '') || 0)
        if (n >= sinceRef.current) sinceRef.current = n
      }
    } catch {
      setErr('Launcher unreachable.')
      setDraft(text)
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="rise-in border border-[var(--gold)] bg-[var(--velvet)]">
      <header className="flex flex-wrap items-end justify-between gap-3 border-b border-[rgba(212,175,55,0.35)] px-5 py-4 md:px-6">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[var(--gold)]">
            Chamber floor
          </p>
          <h2 className="font-display mt-1 text-3xl font-semibold text-[var(--champagne)]">
            Summit chat
          </h2>
        </div>
        <label className="flex flex-col gap-1 text-[10px] uppercase tracking-[0.22em] text-[var(--champagne)]/45">
          Address
          <select
            value={addressId}
            onChange={(e) => onAddressChange(e.target.value)}
            className="min-w-[12rem] border border-[rgba(212,175,55,0.35)] bg-[var(--void)] px-3 py-2 text-xs normal-case tracking-normal text-[var(--champagne)]"
          >
            <option value="floor">Open floor</option>
            {ATTENDEES.filter((a) => a.id !== 'steward').map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <div className="flex h-[min(42vh,22rem)] flex-col gap-3 overflow-y-auto px-5 py-4 md:px-6">
        {messages.length === 0 && (
          <p className="text-sm italic text-[var(--champagne)]/40">
            {launcherUp
              ? 'Floor is quiet. Speak as the Steward — address a seat and they answer if the model is live.'
              : 'Launcher offline — start summit:launcher for the room.'}
          </p>
        )}
        {messages.map((m) => (
          <article
            key={m.id}
            className={
              m.kind === 'system'
                ? 'text-xs italic text-[var(--champagne)]/45'
                : 'border-l-2 border-[rgba(212,175,55,0.35)] pl-3'
            }
          >
            {m.kind !== 'system' && (
              <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]">
                {m.fromName}
                <span className="ml-2 text-[var(--champagne)]/30">
                  {new Date(m.at).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </p>
            )}
            <p
              className={
                m.kind === 'system'
                  ? ''
                  : 'mt-1 whitespace-pre-wrap text-sm leading-6 text-[var(--champagne)]/85'
              }
            >
              {m.text}
            </p>
          </article>
        ))}
        <div ref={bottomRef} />
      </div>

      <form
        className="flex flex-col gap-2 border-t border-[rgba(212,175,55,0.2)] px-5 py-4 md:flex-row md:items-end md:px-6"
        onSubmit={(e) => {
          e.preventDefault()
          void send()
        }}
      >
        <label className="flex-1">
          <span className="sr-only">Message</span>
          <textarea
            rows={2}
            value={draft}
            disabled={!launcherUp || sending}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                void send()
              }
            }}
            placeholder={
              addressId === 'floor'
                ? 'Speak to the open floor…'
                : `Address ${ATTENDEES.find((a) => a.id === addressId)?.name ?? 'seat'}…`
            }
            className="w-full resize-none border border-[rgba(212,175,55,0.28)] bg-[rgba(26,15,18,0.6)] px-3 py-2 text-sm text-[var(--champagne)] placeholder:text-[var(--champagne)]/30 focus:border-[var(--gold)] focus:outline-none disabled:opacity-40"
          />
        </label>
        <button
          type="submit"
          disabled={!launcherUp || sending || !draft.trim()}
          className="shrink-0 border border-[var(--gold)] bg-[var(--gold)] px-6 py-3 text-xs font-bold uppercase tracking-[0.28em] text-[var(--void)] transition hover:bg-[var(--gold-soft)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {sending ? '…' : 'Send'}
        </button>
      </form>
      {err && (
        <p className="px-5 pb-3 text-xs text-[var(--ember)] md:px-6">{err}</p>
      )}
    </section>
  )
}
