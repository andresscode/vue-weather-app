<script setup lang="ts">
import type { DayForecastModel } from '@/types'
import DayForecast from './DayForecast.vue'
import { computed } from 'vue'
import DotsLoader from './DotsLoader.vue'

const props = defineProps<{ data: DayForecastModel[] }>()

const isLoading = computed(() => props.data.length === 0)
</script>

<template>
  <div v-if="isLoading" class="loaderContainer">
    <DotsLoader />
  </div>
  <div v-else class="dayForecastListContainer">
    <DayForecast v-for="item in data" :key="item.id" :model="item" class="dayForecast" />
  </div>
</template>

<style scoped>
.dayForecastListContainer {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.dayForecast + .dayForecast {
  border-top: 1px solid var(--color-border);
  padding-top: 0.5rem;
}

.loaderContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}
</style>
