<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="card">
    <div class="titleContainer">
      <h3>{{ title }}</h3>
    </div>
    <div class="contentContainer">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.titleContainer {
  border-bottom: 1px solid var(--color-border);
}

h3 {
  padding: 1rem 1rem 0.5rem 1rem;
  font-weight: 600;
}

.contentContainer {
  padding: 1rem;
}
</style>
