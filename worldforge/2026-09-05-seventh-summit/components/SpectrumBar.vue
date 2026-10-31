<template>
  <div class="spectrum-bar" :style="{ height: `${height}px` }" aria-hidden="true" />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    height?: number
  }>(),
  {
    height: 4,
  }
)
</script>

<style scoped>
.spectrum-bar {
  width: 100%;
  background: var(--spectrum-bar);
}
</style>
