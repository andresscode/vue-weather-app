<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import CityTabs from './components/CityTabs.vue'
import ForecastCard from './components/ForecastCard.vue'
import { now } from './utils/date'
import HourForecastList from './components/HourForecastList.vue'
import { defaultCities } from './types'
import DayForecastList from './components/DayForecastList.vue'
import { apiFetcher, fetchWeatherDataForCity } from './utils/api'
import AppHeader from './components/AppHeader.vue'

const lastUpdated = ref(now())

onMounted(() => fetchData())

function fetchData() {
  cities.value.forEach(async (city) => {
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
  })
}

const cities = ref(defaultCities)
const selectedCityIndex = ref(0)

function selectCity(cityIndex: number) {
  selectedCityIndex.value = cityIndex
}

const hourlyForecast = computed(() => cities.value[selectedCityIndex.value].hourlyForecast)
const dailyForecast = computed(() => cities.value[selectedCityIndex.value].dailyForecast)
const footerMessage = computed(() => `Last updated on ${lastUpdated.value}`)
</script>

<template>
  <AppHeader :refresh-data="fetchData" />

  <CityTabs :cities :selectedCityIndex :select-new-city="selectCity" />

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
