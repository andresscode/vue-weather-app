<script setup lang="ts">
import IconMagnifyingGlass from './icons/IconMagnifyingGlass.vue'
import IconRefresh from './icons/IconRefresh.vue'

defineProps<{ refreshData: () => void; toggleSearch: () => void }>()
</script>

<template>
  <header>
    <h1>Simple Weather</h1>
    <div class="icons">
      <div @click="refreshData">
        <IconRefresh :color="'#ffffff'" :width="24" :height="24" class="icon" />
      </div>
      <div @click="toggleSearch">
        <IconMagnifyingGlass :color="'#ffffff'" :width="24" :height="24" class="icon" />
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-accent);
  color: white;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  font-size: 10px;
  cursor: default;
  user-select: none;
}

header h1 {
  font-weight: 500;
}

.icons {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.icon {
  cursor: pointer;
}
</style>
