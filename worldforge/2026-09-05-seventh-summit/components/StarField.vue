<template>
  <div class="stars" aria-hidden="true">
    <div
      v-for="s in stars"
      :key="s.id"
      class="star"
      :style="{
        left: `${s.x}%`,
        top: `${s.y}%`,
        width: `${s.size}px`,
        height: `${s.size}px`,
        opacity: s.opacity,
        animationName: 'glow-pulse',
        animationDuration: `${s.dur}s`,
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite',
        animationDelay: `${s.delay}s`,
      }"
    />
  </div>
</template>

<script setup lang="ts">
// Deterministic pseudorandom generator for identical SSR and client hydration
const stars = Array.from({ length: 90 }, (_, i) => {
  const x = ((i * 17 + 23) % 97) + ((i % 5) * 0.5)
  const y = ((i * 29 + 11) % 97) + ((i % 7) * 0.4)
  const size = 0.8 + ((i * 13) % 15) / 10
  const opacity = 0.2 + ((i * 7) % 60) / 100
  const dur = 2.5 + ((i * 11) % 35) / 10
  const delay = ((i * 19) % 40) / 10
  return { id: i, x, y, size, opacity, dur, delay }
})
</script>

<style scoped>
.stars {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
}

.star {
  position: absolute;
  border-radius: var(--radius-orb);
  background: var(--starlight-white);
  box-shadow: 0 0 3px rgba(255, 255, 255, 0.8);
}
</style>
