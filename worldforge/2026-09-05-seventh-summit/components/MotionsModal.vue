<template>
  <div
    v-if="isOpen"
    class="modal-overlay"
    role="dialog"
    aria-modal="true"
    aria-label="Seventh Galactic Summit Motions & Proceedings"
    @click.self="$emit('close')"
  >
    <div class="modal-box motions-modal-box" @click.stop>
      <SpectrumBar :height="4" />

      <div class="modal-content">
        <!-- Header -->
        <div class="header-row">
          <div>
            <div class="proceedings-tag">
              OFFICIAL PROCEEDINGS · {{ proceedings.convened }}
            </div>
            <h2 class="summit-title">{{ proceedings.summit }}</h2>
            <div class="ritual-meta">
              PRESIDING: <span class="highlight">{{ proceedings.presiding }}</span> · RITUAL: {{ proceedings.opening_ritual }}
            </div>
          </div>

          <button
            class="close-button"
            aria-label="Close motions modal"
            @click="$emit('close')"
          >
            ✕
          </button>
        </div>

        <!-- Provisional Alert -->
        <div class="provisional-banner">
          <span class="warning-icon">⚠</span>
          <div>
            <strong>DOCTRINE OF RECORD:</strong> {{ proceedings.status }}
          </div>
        </div>

        <!-- Preamble -->
        <div class="preamble-box">
          <div class="preamble-label">CONVENING PREAMBLE</div>
          <p class="preamble-text">“{{ proceedings.preamble }}”</p>
        </div>

        <div class="divider-line" />

        <!-- Motions List -->
        <div class="motions-scroll">
          <div class="motions-header">
            <h3>ACTIVE MOTIONS BEFORE THE COUNCIL ({{ proceedings.motions.length }})</h3>
          </div>

          <div
            v-for="m in proceedings.motions"
            :key="m.id"
            class="motion-card"
          >
            <div class="motion-card-top">
              <span class="motion-num">MOTION {{ m.id }}</span>
              <span class="motion-title">{{ m.title }}</span>
            </div>

            <div class="motion-finding">
              <span class="finding-tag">FINDING:</span>
              <p>{{ m.finding }}</p>
            </div>

            <div class="motion-question">
              <span class="question-tag">CHAMBER QUESTION:</span>
              <p>{{ m.question }}</p>
            </div>
          </div>
        </div>

        <!-- Footer dismiss -->
        <button
          class="dismiss-button"
          @click="$emit('close')"
        >
          Close Proceedings · Deliberation Continues
        </button>
      </div>

      <SpectrumBar :height="4" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { SUMMIT_PROCEEDINGS } from '~/data/motions'
import SpectrumBar from '~/components/SpectrumBar.vue'

defineProps<{
  isOpen: boolean
}>()

defineEmits<{
  (e: 'close'): void
}>()

const proceedings = SUMMIT_PROCEEDINGS
</script>

<style scoped>
.motions-modal-box {
  width: min(720px, 94vw);
  max-height: 88vh;
  display: flex;
  flex-direction: column;
}

.modal-content {
  padding: var(--size-6);
  display: flex;
  flex-direction: column;
  gap: var(--size-4);
  overflow-y: auto;
  max-height: calc(88vh - 8px);
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--size-4);
}

.proceedings-tag {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.22em;
  color: var(--color-primary);
  text-transform: uppercase;
  margin-bottom: var(--size-1);
}

.summit-title {
  color: var(--color-fg);
  font-size: var(--text-2xl);
  font-family: var(--font-display);
  letter-spacing: 0.04em;
  margin-bottom: var(--size-1);
}

.ritual-meta {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-fg-muted);
  letter-spacing: 0.1em;
}

.ritual-meta .highlight {
  color: var(--color-primary);
  font-weight: 700;
}

.close-button {
  background: transparent;
  border: none;
  color: var(--color-fg-muted);
  font-family: var(--font-mono);
  font-size: var(--text-xl);
  cursor: pointer;
  padding: var(--size-1);
  line-height: 1;
}

.close-button:hover {
  color: var(--color-primary);
}

.provisional-banner {
  background: rgba(216, 7, 22, 0.15);
  border: 1px solid rgba(216, 7, 22, 0.4);
  padding: var(--size-3) var(--size-4);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  gap: var(--size-3);
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-fg);
  line-height: 1.5;
}

.warning-icon {
  color: var(--color-danger);
  font-size: var(--text-base);
}

.preamble-box {
  background: rgba(0, 0, 0, 0.4);
  border-left: 3px solid var(--color-gold-mid);
  padding: var(--size-3) var(--size-4);
}

.preamble-label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.2em;
  color: var(--color-gold-mid);
  margin-bottom: var(--size-1);
}

.preamble-text {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-style: italic;
  color: var(--color-fg);
  line-height: 1.6;
}

.motions-scroll {
  display: flex;
  flex-direction: column;
  gap: var(--size-4);
}

.motions-header h3 {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.18em;
  color: var(--color-primary);
  text-transform: uppercase;
}

.motion-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: var(--size-4);
  display: flex;
  flex-direction: column;
  gap: var(--size-2);
}

.motion-card-top {
  display: flex;
  align-items: center;
  gap: var(--size-3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: var(--size-2);
}

.motion-num {
  font-family: var(--font-mono);
  font-weight: 700;
  color: var(--color-primary);
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
}

.motion-title {
  font-family: var(--font-display);
  font-size: var(--text-base);
  color: var(--color-fg);
  font-weight: 700;
}

.finding-tag, .question-tag {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  display: block;
  margin-bottom: 2px;
}

.finding-tag {
  color: var(--color-info);
}

.question-tag {
  color: var(--color-primary);
}

.motion-finding p, .motion-question p {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  color: var(--color-fg-muted);
  line-height: 1.6;
}

.dismiss-button {
  width: 100%;
  padding: var(--size-3) var(--size-4);
  background: var(--color-surface);
  color: var(--color-fg);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: var(--size-2);
}

.dismiss-button:hover {
  background: var(--color-border);
  color: var(--color-primary);
}
</style>
