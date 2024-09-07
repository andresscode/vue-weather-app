<script setup lang="ts">
import type { CityModel } from '@/types'
import { ref, watchEffect } from 'vue'

const props = defineProps<{
  cities: CityModel[]
  selectedCityIndex: number
  selectNewCity: (index: number) => void
  isSearching: boolean
  addCity: (cityName: string) => void
}>()

const searchQuery = ref<string>('')

const iRef = ref<HTMLInputElement | null>(null)

function handleAddCity() {
  props.addCity(searchQuery.value)
  searchQuery.value = ''
}

watchEffect(() => {
  if (props.isSearching && iRef.value) {
    iRef.value.focus()
  }
})
</script>

<template>
  <ul>
    <form v-if="isSearching" v-on:submit.prevent="handleAddCity">
      <input v-model="searchQuery" ref="iRef" placeholder="Enter name" />
    </form>
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

form input {
  border: none;
  height: 100%;
  max-width: 120px;
  font-size: 1rem;
  padding: 1rem;
  outline: none;
}
</style>
