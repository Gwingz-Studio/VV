<template>
  <div
    v-if="host"
    class="modal-overlay"
    role="dialog"
    aria-modal="true"
    :aria-label="`${host.name} seat details`"
    @click.self="$emit('close')"
  >
    <div class="modal-box" @click.stop>
      <SpectrumBar :height="4" />

      <div class="modal-content">
        <!-- Header row -->
        <div class="header-row">
          <div class="avatar-large">
            <span class="avatar-initial-text">{{ host.initial }}</span>
          </div>

          <div class="header-text">
            <div class="seat-label">
              SEAT {{ String(host.id).padStart(2, '0') }} · GOLDEN WINGERS GALACTIC SUMMIT
            </div>
            <h2 class="host-name">{{ host.name }}</h2>
            <p class="host-tagline">{{ host.tagline }}</p>
          </div>

          <button
            class="close-button"
            aria-label="Close modal"
            @click="$emit('close')"
          >
            ✕
          </button>
        </div>

        <div class="divider-line" />

        <!-- Status & Voice -->
        <div class="status-section">
          <div class="status-label">Chamber Status</div>
          <span
            :class="[
              'franchise-badge',
              host.franchise === 'Franchise' ? 'badge-franchise' : 'badge-independent',
            ]"
          >
            {{ host.franchise }}
          </span>
        </div>

        <div class="voice-box">
          <div class="voice-label">Recorded Chamber Frequency</div>
          <p class="voice-quote">“{{ host.voiceSnippet }}”</p>
        </div>

        <p class="host-desc">
          {{ host.description }}
        </p>

        <p class="host-charter-note">
          <template v-if="host.franchise === 'Franchise'">
            This host operates under the Golden Wingers League Charter — bound by the Golden Path, activated by Slayton energy, and pledged to preserve legacies across the multiverse.
          </template>
          <template v-else>
            This host holds an independent seat, unbound by franchise charter yet recognized by cosmic consensus. Their Slayton energy vibrates freely beyond the axis.
          </template>
        </p>

        <!-- Pledge -->
        <div class="pledge-box">
          <div class="pledge-label">Pledge of the League</div>
          <p class="pledge-quote">
            "Activate their inner Slayton to spread positivity and inspire greatness. Support their fellow Wingers, lifting each other to new heights."
          </p>
        </div>

        <!-- Action button -->
        <button
          class="dismiss-button"
          @click="$emit('close')"
        >
          Dismiss · In Slay We Trust
        </button>
      </div>

      <SpectrumBar :height="4" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Host } from '~/data/hosts'
import SpectrumBar from '~/components/SpectrumBar.vue'

defineProps<{
  host: Host | null
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>

<style scoped>
.modal-content {
  padding: var(--size-6);
  display: flex;
  flex-direction: column;
  gap: var(--size-4);
}

.header-row {
  display: flex;
  align-items: flex-start;
  gap: var(--size-4);
  position: relative;
}

.avatar-large {
  width: 58px;
  height: 58px;
  border-radius: var(--radius-orb);
  border: 2px solid var(--color-primary);
  background: var(--color-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 0 16px rgba(201, 168, 76, 0.3);
}

.avatar-initial-text {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 800;
  color: var(--color-primary);
}

.header-text {
  flex: 1;
}

.seat-label {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-gold-mid);
  letter-spacing: 0.15em;
  margin-bottom: var(--size-1);
}

.host-name {
  color: var(--color-fg);
  font-size: var(--text-2xl);
  font-family: var(--font-display);
  letter-spacing: 0.04em;
  margin-bottom: var(--size-1);
}

.host-tagline {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--color-fg-muted);
}

.close-button {
  background: transparent;
  border: none;
  color: var(--color-fg-muted);
  font-family: var(--font-mono);
  font-size: var(--text-lg);
  cursor: pointer;
  padding: var(--size-1);
  line-height: 1;
  transition: color 0.15s ease;
}

.close-button:hover {
  color: var(--color-primary);
}

.status-section {
  display: flex;
  align-items: center;
  gap: var(--size-3);
}

.status-label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-fg-muted);
}

.voice-box {
  background: rgba(0, 0, 0, 0.4);
  border-left: 2px solid var(--color-primary);
  padding: var(--size-3) var(--size-4);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}

.voice-label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-primary);
  margin-bottom: var(--size-1);
}

.voice-quote {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-style: italic;
  color: var(--color-fg);
  line-height: 1.5;
}

.host-desc {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--color-fg);
  line-height: 1.6;
}

.host-charter-note {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  color: var(--color-fg-muted);
  line-height: 1.6;
}

.pledge-box {
  border-top: 1px solid var(--color-border);
  padding-top: var(--size-3);
}

.pledge-label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-fg-muted);
  margin-bottom: var(--size-1);
}

.pledge-quote {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  color: var(--color-fg-muted);
  font-style: italic;
  line-height: 1.6;
}

.dismiss-button {
  width: 100%;
  padding: var(--size-3) var(--size-4);
  background: var(--button-bg);
  color: var(--button-fg);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(253, 200, 7, 0.3);
  transition: all 0.2s ease;
  margin-top: var(--size-2);
}

.dismiss-button:hover {
  background: var(--button-hover-bg);
  box-shadow: 0 6px 20px rgba(253, 200, 7, 0.45);
  transform: translateY(-1px);
}
</style>
