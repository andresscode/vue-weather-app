<script setup lang="ts">
import type { DayForecastModel } from '@/types'
import { formatDayForecastDate } from '@/utils/date'
import { resolveWeatherIconURL } from '@/utils/icon'
import { computed } from 'vue'

const props = defineProps<{ model: DayForecastModel }>()

const imgSrc = computed(() => resolveWeatherIconURL(props.model.iconCode))

const formattedDate = computed(() => formatDayForecastDate(props.model.date))
</script>

<template>
  <div class="container">
    <img :src="imgSrc" alt="Weather icon" width="50" height="50" />
    <div class="description">
      <p class="date">{{ formattedDate }}</p>
      <p class="message">{{ model.message }}</p>
    </div>
    <p class="temperatures">{{ model.maxTemperature }}° {{ model.minTemperature }}°</p>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.description {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.date {
  font-size: large;
  font-weight: 500;
}

.message {
  font-size: small;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.4);
}

.temperatures {
  font-weight: 500;
}
</style>
