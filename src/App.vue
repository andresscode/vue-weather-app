<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import CityTabs from './components/CityTabs.vue'
import ForecastCard from './components/ForecastCard.vue'
import { now } from './utils/date'
import HourForecastList from './components/HourForecastList.vue'
import { defaultCities, type CityDTO, type CityModel } from './types'
import DayForecastList from './components/DayForecastList.vue'
import { apiFetcher, fetchWeatherDataForCity } from './utils/api'
import AppHeader from './components/AppHeader.vue'

const lastUpdated = ref(now())

const cities = ref(defaultCities)
const selectedCityIndex = ref(0)

function selectCity(cityIndex: number) {
  selectedCityIndex.value = cityIndex
}

onMounted(() => fetchData())

function fetchData() {
  cities.value.forEach((city) => fetchDataForCity(city))
}

async function fetchDataForCity(city: CityModel) {
  try {
    const { hourly, daily } = await fetchWeatherDataForCity(city, new Date(), apiFetcher)
    city.hourlyForecast = hourly
    city.dailyForecast = daily
    lastUpdated.value = now()
  } catch {
    alert(
      `Sorry, something went wrong fetch the forecast for ${city.name}. Please try again later.`
    )
  }
}

const isSearching = ref(false)

function toggleSearch() {
  isSearching.value = !isSearching.value
}

async function addCity(cityName: string) {
  const response = await fetch('/cities.json')
  const decoded = await response.json()

  const map = new Map<string, CityDTO>(Object.entries(decoded))

  const lowerCityName = cityName.toLowerCase()

  if (map.has(lowerCityName)) {
    const foundCity = map.get(lowerCityName)!
    const newCity = { ...foundCity, hourlyForecast: [], dailyForecast: [], liRef: undefined }
    cities.value = [newCity, ...cities.value]
    selectedCityIndex.value = 0
    toggleSearch()
    fetchDataForCity(cities.value[0])
  } else {
    alert(`${cityName} was not found. Please try a different one, for example Munich.`)
  }
}

const hourlyForecast = computed(() => cities.value[selectedCityIndex.value].hourlyForecast)
const dailyForecast = computed(() => cities.value[selectedCityIndex.value].dailyForecast)
const footerMessage = computed(() => `Last updated on ${lastUpdated.value}`)
</script>

<template>
  <AppHeader :refresh-data="fetchData" :toggle-search />

  <CityTabs :cities :selectedCityIndex :select-new-city="selectCity" :is-searching :add-city />

  <main>
    <ForecastCard :title="'Next hours'">
      <template #content>
        <HourForecastList :data="hourlyForecast" />
      </template>
    </ForecastCard>
    <ForecastCard :title="'Next 5 days'">
      <template #content>
        <DayForecastList :data="dailyForecast" />
      </template>
    </ForecastCard>
  </main>

  <footer>
    {{ footerMessage }}
  </footer>
</template>

<style scoped>
main {
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: var(--color-accent);
  color: white;
  text-align: right;
  padding: 0 2px;
}

@media (min-width: 500px) {
  main {
    max-width: 500px;
  }
}

@media (min-height: 667px) {
  main {
    margin-bottom: 24px;
  }
}
</style>
