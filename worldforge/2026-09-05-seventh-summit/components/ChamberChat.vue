<template>
  <div class="chamber-chat-container">
    <!-- Minimized Trigger Button -->
    <button
      v-if="!isOpen"
      class="chat-trigger-btn"
      aria-label="Open Chamber Chat"
      @click="openChat"
    >
      <span class="pulse-beacon" />
      <span class="trigger-text">CHAMBER CHAT</span>
      <span v-if="unreadCount > 0" class="unread-pill">{{ unreadCount }}</span>
    </button>

    <!-- Expanded Chat Window -->
    <div v-else class="chat-window">
      <SpectrumBar :height="3" />

      <!-- Chat Header -->
      <header class="chat-header">
        <div>
          <div class="chamber-floor-badge">CHAMBER FLOOR · LIVE</div>
          <h2 class="chat-title">Summit Deliberation</h2>
        </div>

        <div class="header-controls">
          <label class="address-control">
            <span class="control-label">ADDRESS</span>
            <select
              v-model="addressId"
              class="address-select"
            >
              <option value="floor">Open Floor</option>
              <option v-for="host in HOSTS" :key="host.id" :value="String(host.id)">
                Seat {{ String(host.id).padStart(2, '0') }} · {{ host.name }}
              </option>
            </select>
          </label>

          <button
            class="close-btn"
            aria-label="Close Chat"
            @click="isOpen = false"
          >
            ✕
          </button>
        </div>
      </header>

      <!-- Message History -->
      <div ref="scrollContainer" class="messages-area">
        <div v-if="messages.length === 0" class="empty-state">
          Floor is quiet. Address a seat and they answer if the matrix is resonant.
        </div>

        <article
          v-for="m in messages"
          :key="m.id"
          :class="['message-bubble', `message-kind--${m.kind}`]"
        >
          <div v-if="m.kind !== 'system'" class="message-meta">
            <span class="message-from">{{ m.fromName }}</span>
            <span class="message-time">{{ formatTime(m.at) }}</span>
          </div>

          <p class="message-text">{{ m.text }}</p>
        </article>
      </div>

      <!-- Input Form -->
      <form class="chat-form" @submit.prevent="sendMessage">
        <div class="input-row">
          <textarea
            v-model="draft"
            rows="2"
            :placeholder="placeholderText"
            :disabled="sending"
            class="chat-textarea"
            @keydown.enter.exact.prevent="sendMessage"
          />

          <button
            type="submit"
            :disabled="sending || !draft.trim()"
            class="send-btn"
          >
            {{ sending ? '…' : 'SEND' }}
          </button>
        </div>

        <div v-if="err" class="error-line">{{ err }}</div>

        <div class="input-meta">
          <span>Speaking as: <strong class="text-gold">Steward Vessel</strong></span>
          <span>Shift+Enter for newline</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { HOSTS } from '~/data/hosts'
import SpectrumBar from '~/components/SpectrumBar.vue'

export interface ChatMessage {
  id: string
  at: string
  from: string
  fromName: string
  text: string
  kind: 'user' | 'seat' | 'system'
}

const isOpen = ref(false)
const addressId = ref('floor')
const draft = ref('')
const sending = ref(false)
const err = ref<string | null>(null)
const messages = ref<ChatMessage[]>([])
const scrollContainer = ref<HTMLDivElement | null>(null)
const sinceTimestamp = ref(0)
const unreadCount = ref(0)
let pollTimer: ReturnType<typeof setInterval> | null = null

const placeholderText = computed(() => {
  if (addressId.value === 'floor') return 'Address the open council floor…'
  const target = HOSTS.find((h) => String(h.id) === addressId.value)
  return `Address ${target?.name ?? 'seat'} directly…`
})

function formatTime(iso: string) {
  try {
    const d = new Date(iso)
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  } catch {
    return ''
  }
}

async function scrollToBottom() {
  await nextTick()
  if (scrollContainer.value) {
    scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight
  }
}

function openChat() {
  isOpen.value = true
  unreadCount.value = 0
  void scrollToBottom()
}

async function pullMessages() {
  try {
    const res = await fetch(`/api/summit/chat?since=${sinceTimestamp.value}`)
    if (!res.ok) return
    const data = (await res.json()) as { messages: ChatMessage[]; next: number }
    if (data.messages && data.messages.length > 0) {
      const existingIds = new Set(messages.value.map((m) => m.id))
      const fresh = data.messages.filter((m) => !existingIds.has(m.id))
      if (fresh.length > 0) {
        messages.value.push(...fresh)
        if (!isOpen.value) {
          unreadCount.value += fresh.length
        }
        void scrollToBottom()
      }
      sinceTimestamp.value = data.next ?? sinceTimestamp.value
    }
  } catch {
    // quiet polling fallback
  }
}

async function sendMessage() {
  const text = draft.value.trim()
  if (!text || sending.value) return

  sending.value = true
  err.value = null
  draft.value = ''

  try {
    const res = await fetch('/api/summit/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'steward',
        address: addressId.value === 'floor' ? null : addressId.value,
        text,
      }),
    })

    const data = (await res.json()) as { ok?: boolean; error?: string; messages?: ChatMessage[] }
    if (!res.ok || !data.ok) {
      err.value = data.error || 'Council floor rejected transmission.'
      draft.value = text
      return
    }

    if (data.messages && data.messages.length > 0) {
      const existingIds = new Set(messages.value.map((m) => m.id))
      const add = data.messages.filter((m) => !existingIds.has(m.id))
      if (add.length > 0) {
        messages.value.push(...add)
        void scrollToBottom()
      }
      const last = data.messages[data.messages.length - 1]
      const n = Number(last.id?.replace(/\D/g, '') || Date.now())
      if (n >= sinceTimestamp.value) sinceTimestamp.value = n
    }
  } catch {
    err.value = 'Chamber connection blip. Check connection.'
    draft.value = text
  } finally {
    sending.value = false
  }
}

onMounted(() => {
  void pullMessages()
  pollTimer = setInterval(pullMessages, 2200)
})

onUnmounted(() => {
  if (pollTimer) clearInterval(pollTimer)
})
</script>

<style scoped>
.chamber-chat-container {
  position: fixed;
  bottom: var(--size-5);
  right: var(--size-5);
  z-index: 60;
}

.chat-trigger-btn {
  background: var(--color-surface);
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-sm);
  padding: var(--size-3) var(--size-5);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0.15em;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.7), 0 0 12px rgba(253, 200, 7, 0.2);
  display: flex;
  align-items: center;
  gap: var(--size-3);
  transition: all 0.2s ease;
}

.chat-trigger-btn:hover {
  background: var(--color-primary);
  color: var(--space-black);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(253, 200, 7, 0.4);
}

.pulse-beacon {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-orb);
  background: var(--spectrum-green);
  box-shadow: 0 0 8px var(--spectrum-green);
  animation: glow-pulse 1.8s infinite;
}

.unread-pill {
  background: var(--spectrum-red);
  color: #fff;
  border-radius: var(--radius-arc);
  font-size: 10px;
  padding: 1px 6px;
  font-weight: 800;
}

.chat-window {
  width: min(440px, calc(100vw - 32px));
  background: var(--color-surface);
  border: 1px solid var(--color-gold-mid);
  border-radius: var(--radius-md);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.85), 0 0 20px rgba(201, 168, 76, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: modal-in 0.2s ease-out;
}

.chat-header {
  padding: var(--size-3) var(--size-4);
  background: rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: var(--size-3);
}

.chamber-floor-badge {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.25em;
  color: var(--color-primary);
  font-weight: 700;
}

.chat-title {
  font-family: var(--font-display);
  font-size: var(--text-base);
  color: var(--color-fg);
  margin-top: 2px;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: var(--size-3);
}

.address-control {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.control-label {
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.15em;
  color: var(--color-fg-muted);
}

.address-select {
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-fg);
  font-family: var(--font-mono);
  font-size: 11px;
  padding: 3px 6px;
  border-radius: var(--radius-sm);
  outline: none;
}

.address-select:focus {
  border-color: var(--color-primary);
}

.close-btn {
  background: transparent;
  border: none;
  color: var(--color-fg-muted);
  font-size: var(--text-base);
  cursor: pointer;
  padding: 4px;
}

.close-btn:hover {
  color: var(--color-primary);
}

.messages-area {
  height: 320px;
  overflow-y: auto;
  padding: var(--size-4);
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
  background: rgba(5, 5, 16, 0.6);
}

.empty-state {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-style: italic;
  color: var(--color-fg-muted);
  text-align: center;
  margin: auto;
}

.message-bubble {
  padding: var(--size-2) var(--size-3);
  border-left: 2px solid var(--color-border);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  background: rgba(255, 255, 255, 0.02);
}

.message-kind--seat {
  border-left-color: var(--color-primary);
  background: rgba(253, 200, 7, 0.04);
}

.message-kind--system {
  border-left-color: var(--color-info);
  font-style: italic;
  font-size: var(--text-xs);
  opacity: 0.8;
}

.message-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;
}

.message-from {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--color-primary);
  text-transform: uppercase;
}

.message-time {
  font-family: var(--font-mono);
  font-size: 9px;
  color: var(--color-fg-muted);
}

.message-text {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  line-height: 1.5;
  color: var(--color-fg);
  white-space: pre-wrap;
}

.chat-form {
  padding: var(--size-3) var(--size-4);
  background: var(--color-bg);
  border-top: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: var(--size-2);
}

.input-row {
  display: flex;
  gap: var(--size-2);
}

.chat-textarea {
  flex: 1;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-fg);
  font-family: var(--font-body);
  font-size: var(--text-xs);
  padding: var(--size-2);
  border-radius: var(--radius-sm);
  resize: none;
  outline: none;
}

.chat-textarea:focus {
  border-color: var(--color-primary);
}

.send-btn {
  background: var(--color-primary);
  color: var(--space-black);
  border: none;
  border-radius: var(--radius-sm);
  padding: 0 var(--size-4);
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s;
}

.send-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.error-line {
  color: var(--color-danger);
  font-family: var(--font-mono);
  font-size: 10px;
}

.input-meta {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 9px;
  color: var(--color-fg-muted);
}

.text-gold {
  color: var(--color-primary);
}
</style>
