<template>
  <div class="summit-app">
    <!-- Global Ambient Nav Bar -->
    <header class="global-navbar">
      <div class="nav-brand">
        <a href="#hero" class="brand-link">
          <span class="gold-star">✦</span>
          <span class="brand-title">GWL · SEVENTH SUMMIT</span>
        </a>
      </div>

      <nav class="nav-links">
        <a href="#hero" class="nav-item">Chamber</a>
        <a href="#council" class="nav-item">12 Seats</a>
        <a href="#path" class="nav-item">Golden Path</a>
        <a href="#motions" class="nav-item">Motions</a>
        <a href="#declaration" class="nav-item">Declaration</a>
      </nav>

      <div class="nav-actions">
        <button class="nav-motions-btn" @click="isMotionsOpen = true">
          <span>📜 Motions</span>
        </button>
        <a
          href="https://summit.gwingz.com"
          target="_blank"
          rel="noopener noreferrer"
          class="nav-domain-pill"
          title="Hosted at summit.gwingz.com"
        >
          summit.gwingz.com ↗
        </a>
      </div>
    </header>

    <!-- Main View -->
    <main>
      <NuxtPage
        @select-host="selectedHost = $event"
        @open-motions="isMotionsOpen = true"
      />
    </main>

    <!-- Global Modals -->
    <SeatModal
      :host="selectedHost"
      @close="selectedHost = null"
    />

    <MotionsModal
      :is-open="isMotionsOpen"
      @close="isMotionsOpen = false"
    />

    <!-- Global Floating Chamber Chat -->
    <ChamberChat />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Host } from '~/data/hosts'
import SeatModal from '~/components/SeatModal.vue'
import MotionsModal from '~/components/MotionsModal.vue'
import ChamberChat from '~/components/ChamberChat.vue'

const selectedHost = ref<Host | null>(null)
const isMotionsOpen = ref(false)
</script>

<style scoped>
.summit-app {
  min-height: 100vh;
  background: var(--color-bg);
  color: var(--color-fg);
  position: relative;
}

.global-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 52px;
  background: rgba(5, 5, 16, 0.75);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(201, 168, 76, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--size-6);
  z-index: 50;
}

.nav-brand .brand-link {
  display: flex;
  align-items: center;
  gap: var(--size-2);
  text-decoration: none;
  color: var(--color-fg);
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: 700;
  letter-spacing: 0.1em;
}

.gold-star {
  color: var(--color-primary);
  font-size: var(--text-base);
  animation: glow-pulse 3s infinite;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: var(--size-5);
}

@media (max-width: 820px) {
  .nav-links {
    display: none;
  }
}

.nav-item {
  color: var(--color-fg-muted);
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  text-decoration: none;
  transition: color 0.2s ease;
}

.nav-item:hover {
  color: var(--color-primary);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: var(--size-3);
}

.nav-motions-btn {
  background: rgba(201, 168, 76, 0.12);
  color: var(--color-primary);
  border: 1px solid var(--color-gold-mid);
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 0.1em;
  transition: all 0.2s;
}

.nav-motions-btn:hover {
  background: var(--color-primary);
  color: var(--space-black);
}

.nav-domain-pill {
  color: var(--color-info);
  border: 1px solid rgba(100, 167, 201, 0.3);
  background: rgba(100, 167, 201, 0.08);
  padding: 4px 10px;
  border-radius: var(--radius-arc);
  font-family: var(--font-mono);
  font-size: 10px;
  text-decoration: none;
  letter-spacing: 0.1em;
  transition: all 0.2s;
}

.nav-domain-pill:hover {
  border-color: var(--color-info);
  background: rgba(100, 167, 201, 0.2);
}
</style>
