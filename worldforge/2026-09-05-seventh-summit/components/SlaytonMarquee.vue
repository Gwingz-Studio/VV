<template>
  <div class="marquee-track" aria-hidden="true">
    <div class="marquee-content">
      <span v-for="(item, i) in repeatedItems" :key="i" class="marquee-item">
        {{ item }} <span class="marquee-star">✦</span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const items = [
  'IN SLAY WE TRUST',
  'NO TEA UNSPILLED',
  'NO VISION UNFULFILLED',
  'NO SLAYTON UNVIBRATED',
  'ACTIVATE YOUR INNER SLAYTON',
  'THE GOLDEN PATH',
  'CREATE WITHOUT LIMITS',
  'SEVENTH GALACTIC SUMMIT',
  'SUMMIT.GWINGZ.COM',
]

const repeatedItems = computed(() => [...items, ...items])
</script>

<style scoped>
.marquee-track {
  overflow: hidden;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  padding: var(--size-2) 0;
  background: rgba(11, 11, 13, 0.85);
  backdrop-filter: blur(4px);
  width: 100%;
}

.marquee-content {
  display: flex;
  gap: var(--size-6);
  animation: marquee 24s linear infinite;
  white-space: nowrap;
  width: max-content;
}

.marquee-item {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.22em;
  color: var(--color-fg-muted);
  text-transform: uppercase;
}

.marquee-star {
  color: var(--color-primary);
  margin-left: var(--size-2);
}
</style>
