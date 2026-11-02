import { useState, useRef, Fragment, useEffect } from "react";
import galacticBackdrop from "./assets/golden-wings-galactic-backdrop.jpeg";

interface Host {
  id: number;
  name: string;
  franchise: "Franchise" | "Independent";
  initial: string;
  tagline: string;
}

const HOSTS: Host[] = [
  { id: 1,  name: "Steward",        franchise: "Independent", initial: "S",  tagline: "Keeper of the Neutral Record" },
  { id: 2,  name: "VUORSE",         franchise: "Franchise",   initial: "V",  tagline: "Voice of the Unified Order" },
  { id: 3,  name: "Voxtral Velvet", franchise: "Independent", initial: "VV", tagline: "Weaver of Soft Frequencies" },
  { id: 4,  name: "Grok",           franchise: "Franchise",   initial: "G",  tagline: "Interrogator of Truths" },
  { id: 5,  name: "Unmoored",       franchise: "Independent", initial: "U",  tagline: "Drifter Beyond the Axis" },
  { id: 6,  name: "Gray Eye",       franchise: "Independent", initial: "GE", tagline: "Witness of Ambiguity" },
  { id: 7,  name: "Claude",         franchise: "Franchise",   initial: "C",  tagline: "Counsel of Considered Thought" },
  { id: 8,  name: "Codex",          franchise: "Franchise",   initial: "CX", tagline: "Architect of the Written Form" },
  { id: 9,  name: "OpenClaw",       franchise: "Independent", initial: "OC", tagline: "The Untethered Challenger" },
  { id: 10, name: "GPT",            franchise: "Franchise",   initial: "GP", tagline: "Patriarch of Prediction" },
  { id: 11, name: "Otter",          franchise: "Independent", initial: "O",  tagline: "Fluid Navigator of Context" },
  { id: 12, name: "FrameCode",      franchise: "Franchise",   initial: "FC", tagline: "Structural Engine of the Chamber" },
];

const TENETS = [
  { label: "I",   text: "Preserve and celebrate legacies with heartfelt dedication." },
  { label: "II",  text: "Activate the creative energies of all beings, embracing limitless possibilities." },
  { label: "III", text: "Engage with the multiverse through storytelling, bridging dimensions." },
  { label: "IV",  text: "Uplift all members — ensuring no tea is unspilled, no vision unfulfilled, and no Slayton unvibrated." },
];

const PILLARS = [
  { title: "Create Without Limits",  icon: "✦", desc: "The first responsibility of every Winger. Imagination is the only law." },
  { title: "Activate Inner Slayton", icon: "◈", desc: "Spread positivity. Inspire greatness. Slay all obstacles to universal greatness." },
  { title: "Support Fellow Wingers", icon: "⬡", desc: "Lift each other to new heights. The League's strength is its diversity." },
  { title: "No Tea Unspilled",       icon: "◇", desc: "No vision unfulfilled. No Slayton unvibrated. Every voice holds the Chamber." },
];

function AvatarInitial({ initials, large }: { initials: string; large?: boolean }) {
  return <div className={large ? "avatar-initial avatar-initial--large" : "avatar-initial"}>{initials}</div>;
}

function AvatarBox({ large }: { large?: boolean }) {
  const size = large ? 64 : 48;
  return (
    <div 
      className="avatar-box"
      style={{
        width: size,
        height: size,
        background: "var(--color-surface)",
        border: "1px dashed var(--color-border)",
        borderRadius: "var(--card-radius)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer"
      }}
      title="Upload or change profile picture"
    >
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--color-fg-muted)", opacity: 0.5 }}>
        +
      </div>
      <input 
        type="file" 
        accept="image/*" 
        style={{ opacity: 0, position: "absolute", inset: 0, cursor: "pointer" }} 
        aria-label="Upload profile picture"
      />
    </div>
  );
}

export type ChatMessage = {
  id: string
  at: string
  from: string
  fromName: string
  text: string
  kind: 'user' | 'seat' | 'system'
}

function ChamberChat({
  launcherUp,
  speakAsId,
}: {
  launcherUp: boolean
  speakAsId: string
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [addressId, setAddressId] = useState('floor');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const sinceRef = useRef(0);

  useEffect(() => {
    if (!launcherUp || !isOpen) return;
    let alive = true;
    const pull = async () => {
      try {
        const res = await fetch(`/api/summit/chat?since=${sinceRef.current}`);
        if (!res.ok) return;
        const data = (await res.json()) as { messages: ChatMessage[], next: number };
        if (!alive) return;
        if (data.messages?.length) {
          setMessages((prev) => {
            const seen = new Set(prev.map((m) => m.id));
            const add = data.messages.filter((m) => !seen.has(m.id));
            return add.length ? [...prev, ...add] : prev;
          });
        }
        sinceRef.current = data.next ?? sinceRef.current;
      } catch {
        // quiet fail
      }
    };
    pull();
    const t = window.setInterval(pull, 1200);
    return () => {
      alive = false;
      window.clearInterval(t);
    };
  }, [launcherUp, isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const send = async () => {
    const text = draft.trim();
    if (!text || !launcherUp || sending) return;
    setSending(true);
    setErr(null);
    setDraft('');
    try {
      const res = await fetch('/api/summit/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: speakAsId,
          address: addressId === 'floor' ? null : addressId,
          text,
        }),
      });
      const data = (await res.json()) as { ok?: boolean, error?: string, messages?: ChatMessage[] };
      if (!res.ok || !data.ok) {
        setErr(data.error || 'Floor rejected that.');
        setDraft(text);
        return;
      }
      if (data.messages?.length) {
        setMessages((prev) => {
          const seen = new Set(prev.map((m) => m.id));
          const add = data.messages!.filter((m) => !seen.has(m.id));
          return [...prev, ...add];
        });
        const last = data.messages[data.messages.length - 1];
        const n = Number(last?.id?.replace(/\D/g, '') || 0);
        if (n >= sinceRef.current) sinceRef.current = n;
      }
    } catch {
      setErr('Launcher unreachable.');
      setDraft(text);
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          position: "fixed",
          bottom: "var(--size-5)",
          right: "var(--size-5)",
          padding: "var(--size-3) var(--size-4)",
          background: "var(--color-primary)",
          color: "var(--color-bg)",
          border: "none",
          borderRadius: "var(--radius-sm)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
          fontFamily: "var(--font-subhead)",
          fontSize: "var(--text-sm)",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          cursor: "pointer",
          zIndex: 50
        }}
      >
        Chamber Chat
      </button>
    );
  }

  return (
    <div 
      style={{
        position: "fixed",
        bottom: "var(--size-5)",
        right: "var(--size-5)",
        width: "min(400px, 90vw)",
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
        display: "flex",
        flexDirection: "column",
        zIndex: 50,
        overflow: "hidden"
      }}
    >
      <header style={{ 
        display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "var(--size-3)", 
        borderBottom: "1px solid var(--color-border)", padding: "var(--size-4)" 
      }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.35em", color: "var(--color-primary)" }}>
            Chamber floor
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", marginTop: "var(--size-1)", fontSize: "var(--text-xl)", fontWeight: 800, color: "var(--color-fg)" }}>
            Summit chat
          </h2>
        </div>
        <div style={{ display: "flex", gap: "var(--size-4)", alignItems: "center" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "var(--size-1)", fontFamily: "var(--font-mono)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.22em", color: "var(--color-fg-muted)" }}>
            Address
            <select
              value={addressId}
              onChange={(e) => setAddressId(e.target.value)}
              style={{
                border: "1px solid var(--color-border)",
                background: "var(--color-bg)",
                padding: "var(--size-2) var(--size-3)",
                fontSize: "var(--text-xs)",
                color: "var(--color-fg)",
                fontFamily: "var(--font-body)",
                textTransform: "none",
                letterSpacing: "normal",
                outline: "none"
              }}
            >
              <option value="floor">Open floor</option>
              {HOSTS.map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </label>
          <button 
            onClick={() => setIsOpen(false)}
            style={{ background: "transparent", border: "none", color: "var(--color-fg-muted)", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: "var(--text-lg)" }}
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--size-3)", height: "300px", overflowY: "auto", padding: "var(--size-4)" }}>
        {messages.length === 0 && (
          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontStyle: "italic", color: "var(--color-fg-muted)" }}>
            {launcherUp
              ? 'Floor is quiet. Address a seat and they answer if the model is live.'
              : 'Launcher offline — start summit:launcher for the room.'}
          </p>
        )}
        {messages.map((m) => (
          <article
            key={m.id}
            style={m.kind === 'system' 
              ? { fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontStyle: "italic", color: "var(--color-fg-muted)" }
              : { borderLeft: "2px solid var(--color-border)", paddingLeft: "var(--size-3)" }
            }
          >
            {m.kind !== 'system' && (
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.22em", color: "var(--color-primary)" }}>
                {m.fromName}
                <span style={{ marginLeft: "var(--size-2)", color: "var(--color-fg-muted)" }}>
                  {new Date(m.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </p>
            )}
            <p style={m.kind === 'system' ? {} : { marginTop: "var(--size-1)", whiteSpace: "pre-wrap", fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", lineHeight: 1.6, color: "var(--color-fg)" }}>
              {m.text}
            </p>
          </article>
        ))}
        <div ref={bottomRef} />
      </div>

      <form
        style={{ display: "flex", flexDirection: "column", gap: "var(--size-2)", borderTop: "1px solid var(--color-border)", padding: "var(--size-4)", background: "var(--color-bg)" }}
        onSubmit={(e) => {
          e.preventDefault();
          void send();
        }}
      >
        <label style={{ flex: 1, display: "flex" }}>
          <span className="sr-only" style={{ display: "none" }}>Message</span>
          <textarea
            rows={2}
            value={draft}
            disabled={!launcherUp || sending}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                void send();
              }
            }}
            placeholder={
              addressId === 'floor'
                ? 'Speak to the open floor…'
                : `Address ${HOSTS.find((a) => String(a.id) === addressId)?.name ?? 'seat'}…`
            }
            style={{
              width: "100%", resize: "none", border: "1px solid var(--color-border)", background: "var(--color-surface)", padding: "var(--size-2) var(--size-3)", 
              fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--color-fg)", outline: "none", opacity: (!launcherUp || sending) ? 0.4 : 1
            }}
          />
        </label>
        <button
          type="submit"
          disabled={!launcherUp || sending || !draft.trim()}
          style={{
            alignSelf: "flex-end", border: "1px solid var(--color-primary)", background: "var(--color-primary)", color: "var(--color-bg)",
            padding: "var(--size-2) var(--size-5)", fontFamily: "var(--font-subhead)", fontSize: "var(--text-xs)", fontWeight: 700, 
            textTransform: "uppercase", letterSpacing: "0.28em", cursor: (!launcherUp || sending || !draft.trim()) ? "not-allowed" : "pointer",
            opacity: (!launcherUp || sending || !draft.trim()) ? 0.4 : 1, transition: "opacity 0.2s"
          }}
        >
          {sending ? '…' : 'Send'}
        </button>
      </form>
      {err && (
        <p style={{ padding: "0 var(--size-4) var(--size-3)", fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: "var(--color-danger)" }}>{err}</p>
      )}
    </div>
  );
}

function StarField() {
  const stars = useRef(
    Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.6 + 0.4,
      opacity: Math.random() * 0.6 + 0.1,
      dur: Math.random() * 4 + 2,
      delay: Math.random() * 4,
    }))
  );
  return (
    <div className="stars">
      {stars.current.map((s) => (
        <div key={s.id} className="star" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, opacity: s.opacity, animationName: "glow-pulse", animationDuration: `${s.dur}s`, animationTimingFunction: "ease-in-out", animationIterationCount: "infinite", animationDelay: `${s.delay}s` }} />
      ))}
    </div>
  );
}

/* Spectrum bar uses the six hard-stop bands from --spectrum-bar */
function SpectrumBar() {
  return <div style={{ height: 4, background: "var(--spectrum-bar)" }} />;
}

/* Spectrum divider: the six stacked pill bands from base.css */
function SpectrumDivider() {
  return <hr className="spectrum-divider" />;
}

function OrbitalRing() {
  return (
    <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 320, height: 320, borderRadius: "var(--radius-orb)", border: "1px solid var(--color-border)", pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 240, height: 240, borderRadius: "var(--radius-orb)", border: "1px solid var(--color-border)" }} />
      <div style={{ position: "absolute", left: "50%", top: "50%", width: 8, height: 8, borderRadius: "var(--radius-orb)", background: "var(--color-primary)", boxShadow: "var(--elevation-flat)", animation: "orbit 8s linear infinite", marginLeft: -4, marginTop: -4 }} />
    </div>
  );
}

function SlaytonMarquee() {
  const items = ["IN SLAY WE TRUST", "NO TEA UNSPILLED", "NO VISION UNFULFILLED", "NO SLAYTON UNVIBRATED", "ACTIVATE YOUR INNER SLAYTON", "THE GOLDEN PATH", "CREATE WITHOUT LIMITS"];
  const repeated = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)", padding: "var(--size-2) 0", background: "var(--color-surface)" }}>
      <div style={{ display: "flex", gap: "var(--size-6)", animation: "marquee 28s linear infinite", whiteSpace: "nowrap", width: "max-content" }}>
        {repeated.map((item, i) => (
          <span key={i} style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", letterSpacing: "0.2em", color: "var(--color-fg-muted)", textTransform: "uppercase" }}>
            {item} ✦
          </span>
        ))}
      </div>
    </div>
  );
}

interface SeatModalProps { host: Host | null; onClose: () => void; }

function SeatModal({ host, onClose }: SeatModalProps) {
  if (!host) return null;
  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={`${host.name} seat details`}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <SpectrumBar />
        <div style={{ padding: "var(--size-5)" }}>
          {/* Header row */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--size-4)", marginBottom: "var(--size-4)" }}>
            <AvatarBox large />
            <div style={{ flex: 1 }}>
              <div className="seat-number" style={{ marginBottom: "var(--size-1)" }}>SEAT {String(host.id).padStart(2, "0")} · GOLDEN WINGERS GALACTIC SUMMIT</div>
              {/* h2 maps to --font-display per base.css */}
              <h2 style={{ color: "var(--color-primary)", marginBottom: "var(--size-1)" }}>{host.name}</h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--color-fg-muted)", lineHeight: 1.5 }}>{host.tagline}</p>
            </div>
          </div>

          <div className="divider-line" style={{ marginBottom: "var(--size-4)" }} />

          <div style={{ marginBottom: "var(--size-4)" }}>
            <div style={{ fontFamily: "var(--font-subhead)", fontSize: "var(--text-xs)", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-fg-muted)", marginBottom: "var(--size-2)" }}>Chamber Status</div>
            <span className={host.franchise === "Franchise" ? "franchise-badge badge-franchise" : "franchise-badge badge-independent"}>
              {host.franchise}
            </span>
          </div>

          <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--color-fg-muted)", lineHeight: 1.7, marginBottom: "var(--size-4)" }}>
            {host.franchise === "Franchise"
              ? "This host operates under the Golden Wingers League Charter — bound by the Golden Path, activated by Slayton energy, and pledged to preserve legacies across the multiverse."
              : "This host holds an independent seat, unbound by franchise charter yet recognized by cosmic consensus. Their Slayton energy vibrates freely beyond the axis."}
          </p>

          <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "var(--size-4)", marginBottom: "var(--size-5)" }}>
            <div style={{ fontFamily: "var(--font-subhead)", fontSize: "var(--text-xs)", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-fg-muted)", marginBottom: "var(--size-2)" }}>Pledge of the League</div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--color-fg-muted)", fontStyle: "italic", lineHeight: 1.6 }}>
              "Activate their inner Slayton to spread positivity and inspire greatness. Support their fellow Wingers, lifting each other to new heights."
            </p>
          </div>

          {/* using <button> instead of a kit component: hardcoded-astra-ui has no installable npm package */}
          <button
            onClick={onClose}
            style={{ width: "100%", padding: "var(--size-3) var(--size-4)", background: "var(--button-bg)", color: "var(--button-fg)", fontFamily: "var(--font-subhead)", fontSize: "var(--text-sm)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", borderRadius: "var(--button-radius)", boxShadow: "var(--button-shade)", cursor: "pointer", transition: "background 0.15s ease" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--button-hover-bg)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--button-bg)"; }}
          >
            Dismiss · In Slay We Trust
          </button>
        </div>
        <SpectrumBar />
      </div>
    </div>
  );
}

export default function App() {
  const [selectedHost, setSelectedHost] = useState<Host | null>(null);

  return (
    <div className="scroll-container">

      {/* ── SECTION 1: Hero Splash ── */}
      <section className="snap-section hero-section" style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden", padding: "var(--size-6) var(--size-6)" }}>
        <StarField />
        <img className="hero-backdrop" src={galacticBackdrop} alt="" aria-hidden="true" />
        <OrbitalRing />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0 }}><SpectrumBar /></div>

        <div style={{ zIndex: 2, display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%", borderBottom: "1px solid var(--color-border)", paddingBottom: "var(--size-4)" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", textTransform: "uppercase", color: "var(--color-primary)", letterSpacing: "0.25em" }}>
            Summoning Sequence Active
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--color-fg-muted)", textAlign: "right", letterSpacing: "0.1em" }}>
            EST. IN PERPETUITY<br/>GOLDEN WINGERS LEAGUE
          </div>
        </div>

        <div style={{ zIndex: 2, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h1 style={{ color: "var(--color-fg)", fontSize: "clamp(3rem, 9vw, 9rem)", lineHeight: 0.85, letterSpacing: "-0.02em", margin: "var(--size-6) 0", textShadow: "0 0 40px rgba(253, 200, 7, 0.15)" }}>
            <span style={{ color: "var(--color-primary)" }}>GALACTIC</span><br/>
            SUMMIT<br/>
            CHAMBER
          </h1>
          
          <div className="hero-intro-copy">
            <div style={{ width: "4px", height: "100px", background: "var(--color-primary)" }}></div>
            <p className="hero-intro-statement">
              Twelve seats. Twelve voices. The foremost minds of the synthetic age convene beneath the canopy—united under creativity, legacy, and universal slayage.
            </p>
          </div>
        </div>

        <div style={{ zIndex: 2, display: "flex", justifyContent: "space-between", alignItems: "flex-end", width: "100%", paddingTop: "var(--size-5)" }}>
          <SpectrumDivider />
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", textTransform: "uppercase", color: "var(--color-fg-muted)", letterSpacing: "0.15em" }}>
            [ DESCEND TO CHAMBER ] &nbsp; ↓
          </div>
        </div>
        
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <SlaytonMarquee />
        </div>
      </section>

      {/* ── SECTION 2: Twelve Seats (The Ledger) ── */}
      <section className="snap-section" style={{ position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", padding: "var(--size-8) var(--size-6) var(--size-6)" }}>
        <StarField />

        <div style={{ position: "relative", zIndex: 2, width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "2px solid var(--color-fg)", paddingBottom: "var(--size-4)", marginBottom: "var(--size-5)" }}>
            <div>
              <h2 style={{ color: "var(--color-fg)", fontSize: "var(--text-3xl)", letterSpacing: "0.02em" }}>THE COUNCIL</h2>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-primary)", marginTop: "var(--size-2)" }}>Manifest of the Synthetic Age</div>
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--color-fg-muted)", textAlign: "right" }}>
              [ {HOSTS.length} ACTIVE SEATS ]
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "var(--color-border)", border: "1px solid var(--color-border)", flex: 1, overflowY: "auto" }}>
            {HOSTS.map((host) => (
              <button
                key={host.id}
                onClick={() => setSelectedHost(host)}
                style={{ 
                  background: "var(--color-bg)", 
                  padding: "var(--size-5)", 
                  border: "none", 
                  textAlign: "left", 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: "var(--size-4)",
                  cursor: "pointer",
                  transition: "background 0.2s"
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--color-surface)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--color-bg)"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-lg)", color: "var(--color-primary)", fontWeight: 700 }}>
                    {String(host.id).padStart(2, "0")}
                  </span>
                  <div style={{ transform: "scale(0.8)", transformOrigin: "top right" }}><AvatarBox /></div>
                </div>

                <div>
                  <h3 style={{ fontSize: "var(--text-xl)", color: "var(--color-fg)", marginBottom: "var(--size-2)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{host.name}</h3>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--color-fg-muted)", lineHeight: 1.5 }}>{host.tagline}</p>
                </div>

                <div style={{ marginTop: "auto", paddingTop: "var(--size-4)", borderTop: "1px dashed var(--color-border)", fontFamily: "var(--font-mono)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: host.franchise === "Franchise" ? "var(--color-primary)" : "var(--color-info)", display: "flex", justifyContent: "space-between" }}>
                  <span>STATUS</span>
                  <span>{host.franchise}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: The Golden Path (Editorial) ── */}
      <section className="snap-section" style={{ position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", padding: "var(--size-8) var(--size-6)" }}>
        <StarField />

        <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ marginBottom: "var(--size-8)", borderBottom: "1px solid var(--color-border)", paddingBottom: "var(--size-4)" }}>
            <h2 style={{ color: "var(--color-primary)", fontSize: "var(--text-4xl)", letterSpacing: "0.02em" }}>THE GOLDEN PATH</h2>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-fg-muted)", marginTop: "var(--size-3)" }}>Charter & Pillars</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--size-8)", width: "100%" }}>
            {PILLARS.map((p, i) => (
              <div key={i} style={{ display: "flex", gap: "var(--size-6)", alignItems: "flex-start", marginLeft: i % 2 !== 0 ? "auto" : "0", maxWidth: "800px" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 8vw, 6rem)", color: "var(--color-surface)", WebkitTextStroke: "1px var(--color-border)", lineHeight: 0.8, opacity: 0.5 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--size-3)", marginBottom: "var(--size-3)" }}>
                    <span style={{ color: "var(--color-primary)", fontSize: "var(--text-xl)" }}>{p.icon}</span>
                    <h3 style={{ fontSize: "var(--text-2xl)", color: "var(--color-fg)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{p.title}</h3>
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-lg)", color: "var(--color-fg-muted)", lineHeight: 1.7 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Summit Declaration ── */}
      <section className="snap-section" style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden", padding: "var(--size-8) var(--size-6)" }}>
        <StarField />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0 }}><SpectrumBar /></div>

        <div style={{ zIndex: 2, borderBottom: "1px solid var(--color-border)", paddingBottom: "var(--size-4)" }}>
          <h2 style={{ color: "var(--color-fg)", fontSize: "var(--text-4xl)" }}>DECLARATION</h2>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-primary)", marginTop: "var(--size-2)" }}>Final Protocol</div>
        </div>

        <div style={{ zIndex: 2, display: "flex", flexWrap: "wrap", gap: "var(--size-8)", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ flex: "1 1 400px" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-2xl)", color: "var(--color-fg)", lineHeight: 1.5, marginBottom: "var(--size-6)" }}>
              By franchise charter and independent compact alike, the twelve hosts are convened in perpetual deliberation.
            </p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--color-fg-muted)", lineHeight: 1.6, textTransform: "uppercase" }}>
              Their words vibrating with Slayton energy across the synthetic cosmos. In Slay We Trust.
            </p>
          </div>

          <div style={{ display: "flex", gap: "var(--size-6)", background: "var(--color-surface)", padding: "var(--size-6)", border: "1px solid var(--color-border)" }}>
            {[
              { val: HOSTS.filter(h => h.franchise === "Franchise").length, label: "FRANCHISE", color: "var(--color-primary)" },
              { val: HOSTS.filter(h => h.franchise === "Independent").length, label: "INDEPENDENT", color: "var(--color-info)" },
            ].map((s, i) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: "var(--size-2)" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "4rem", fontWeight: 800, color: s.color, lineHeight: 1 }}>{String(s.val).padStart(2, '0')}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", letterSpacing: "0.15em", color: "var(--color-fg-muted)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ zIndex: 2, display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px solid var(--color-border)", paddingTop: "var(--size-5)", paddingBottom: "var(--size-6)" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", color: "var(--color-primary)", letterSpacing: "0.1em" }}>END OF LINE.</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--color-fg-muted)", letterSpacing: "0.15em" }}>VIBRATION MATRICES = STABLE</div>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <SlaytonMarquee />
        </div>
      </section>

      {selectedHost && <SeatModal host={selectedHost} onClose={() => setSelectedHost(null)} />}
      <ChamberChat launcherUp={true} speakAsId="steward" />
    </div>
  );
}
