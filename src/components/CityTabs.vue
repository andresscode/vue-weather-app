<script setup lang="ts">
import type { CityModel } from '@/types'

defineProps<{
  cities: CityModel[]
  selectedCityIndex: number
  selectNewCity: Function
}>()
</script>

<template>
  <ul>
    <li
      v-for="(city, index) in cities"
      :key="city.name"
      :class="{ active: index === selectedCityIndex }"
      @click="selectNewCity(index)"
    >
      {{ city.name.toUpperCase() }}
    </li>
  </ul>
</template>

<style scoped>
ul {
  display: flex;
  padding: 0;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  background-color: #fff;
}

li {
  padding: 1rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

.active {
  color: #000;
  border-bottom: 3px solid rgb(255, 119, 0);
}
</style>
