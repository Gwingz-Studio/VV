<template>
  <div class="orbital-system" aria-hidden="true">
    <div class="orbital-ring orbital-ring--outer">
      <div class="orbital-ring orbital-ring--inner" />
      <div class="orbital-body" />
    </div>
  </div>
</template>

<script setup lang="ts">
// Ambient orbital ring animation
</script>

<style scoped>
.orbital-system {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 1;
}

.orbital-ring--outer {
  position: relative;
  width: 320px;
  height: 320px;
  border-radius: var(--radius-orb);
  border: 1px solid rgba(201, 168, 76, 0.2);
}

.orbital-ring--inner {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 240px;
  height: 240px;
  border-radius: var(--radius-orb);
  border: 1px dashed rgba(255, 255, 255, 0.12);
}

.orbital-body {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 8px;
  height: 8px;
  border-radius: var(--radius-orb);
  background: var(--color-primary);
  box-shadow: 0 0 12px var(--color-primary);
  animation: orbit 8s linear infinite;
  margin-left: -4px;
  margin-top: -4px;
}
</style>
