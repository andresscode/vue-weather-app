<script setup lang="ts">
import { formatHourForecastTime } from '@/utils/date'
import { resolveWeatherIconURL } from '@/utils/icon'
import { computed } from 'vue'

const props = defineProps<{
  temperature: number
  percentage: number
  iconCode: string
  time: Date
}>()

const imgSrc = computed(() => resolveWeatherIconURL(props.iconCode))

const formattedTime = computed(() => formatHourForecastTime(props.time))
</script>

<template>
  <div class="container">
    <div>{{ temperature }}°</div>
    <div class="percentage">{{ percentage }}%</div>
    <img :src="imgSrc" alt="Weather icon" width="50" height="50" />
    <div class="time">{{ formattedTime }}</div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: small;
}

.container div {
  font-weight: 600;
}

.percentage {
  color: #09a3e0;
}

.time {
  color: rgba(0, 0, 0, 0.4);
}
</style>
