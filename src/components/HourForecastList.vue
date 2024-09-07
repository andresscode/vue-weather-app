<script setup lang="ts">
import type { HourForecastModel } from '@/types'
import HourForecast from './HourForecast.vue'
import { computed } from 'vue'
import SpinLoader from './SpinLoader.vue'

const props = defineProps<{
  data: HourForecastModel[]
}>()

const isLoading = computed(() => props.data.length === 0)
</script>

<template>
  <div v-if="isLoading" class="spinnerContainer">
    <SpinLoader />
    <p>Loading</p>
  </div>
  <div v-else class="hourForecastListContainer">
    <HourForecast
      v-for="item in data"
      :key="item.id"
      :temperature="item.temperature"
      :percentage="item.pop"
      :iconCode="item.iconCode"
      :time="item.time"
      class="hourForecast"
    />
  </div>
</template>

<style scoped>
.hourForecastListContainer {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

.hourForecast {
  position: relative;
}

.hourForecast + .hourForecast::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 60%;
  width: 1px;
  background-color: var(--color-border);
}

.hourForecast + .hourForecast {
  padding-left: 0.5rem;
}

.spinnerContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 16px;
}
</style>
