import { describe, it, expect } from 'vitest'
import { defaultCities, type DayForecastModel, type HourForecastModel } from '@/types'
import { fakeFetcher, fetchWeatherDataForCity } from '../api'
import { mapApiTimestamp } from '../date'

describe('api', () => {
  it('retrieves hourly forecast correctly', async () => {
    // The 'id' is a randomUUID so ignore it
    const expected: HourForecastModel[] = [
      { id: '1', temperature: 22, pop: 0, iconCode: '04n', time: mapApiTimestamp(1725688800) },
      { id: '2', temperature: 21, pop: 0, iconCode: '03d', time: mapApiTimestamp(1725699600) },
      { id: '3', temperature: 25, pop: 0, iconCode: '01d', time: mapApiTimestamp(1725710400) },
      { id: '4', temperature: 27, pop: 0, iconCode: '01d', time: mapApiTimestamp(1725721200) },
      { id: '5', temperature: 26, pop: 0, iconCode: '01d', time: mapApiTimestamp(1725732000) },
      { id: '6', temperature: 24, pop: 0, iconCode: '01n', time: mapApiTimestamp(1725742800) },
      { id: '7', temperature: 24, pop: 0, iconCode: '01n', time: mapApiTimestamp(1725753600) },
      { id: '8', temperature: 23, pop: 0, iconCode: '01n', time: mapApiTimestamp(1725764400) }
    ]

    const { hourly: actual } = await fetchWeatherDataForCity(
      defaultCities[0],
      mapApiTimestamp(1725688800),
      fakeFetcher
    )

    expect(actual).toHaveLength(expected.length)

    actual.forEach((actualItem, index) => {
      Object.keys(actualItem).forEach((key) => {
        if (key === 'id') return
        expect(actualItem[key]).toEqual(expected[index][key])
      })
    })
  })

  it('retrieves daily forecast correctly', async () => {
    // The 'id' is a randomUUID so ignore it
    const expected: DayForecastModel[] = [
      {
        id: '1',
        iconCode: '01d', // 01n, 01n, 01n, 01d, 01d, 01d, 01d, 01n
        date: mapApiTimestamp(1725753600), // 2024-09-08
        message: 'Clear throughout the day.',
        maxTemperature: 29, // 23.84, 23.05, 22.24, 21.89, 26.33, 28.83, 28.19, 25.77
        minTemperature: 22
      },
      {
        id: '2',
        iconCode: '01d', // 01n, 01n, 01n, 01d, 01d, 01d, 01d, 01n
        date: mapApiTimestamp(1725840000), // 2024-09-09
        message: 'Clear throughout the day.',
        maxTemperature: 29, // 23.81, 22.59, 21.68, 21.08, 25.26, 28.82, 28.03, 25.07
        minTemperature: 21
      },
      {
        id: '3',
        iconCode: '04d', // 01n, 01n, 03n, 04d, 04d, 04d, 03d, 01n
        date: mapApiTimestamp(1725926400), // 2024-09-10
        message: 'Clouds throughout the day.',
        maxTemperature: 30, // 23.75, 22.76, 21.81, 21.2, 26.37, 29.5, 29.04, 25.8
        minTemperature: 21
      },
      {
        id: '4',
        iconCode: '04d', // 01n, 02n, 02n, 03d, 04d, 04d, 04d, 04n
        date: mapApiTimestamp(1726012800), // 2024-09-11
        message: 'Clouds throughout the day.',
        maxTemperature: 34, // 25.33, 24.13, 23.55, 22.91, 28.72, 33.9, 31.81, 28.23
        minTemperature: 23
      },
      {
        id: '5',
        iconCode: '04d', // 04n, 04n
        date: mapApiTimestamp(1726099200), // 2024-09-12
        message: 'Clouds throughout the day.',
        maxTemperature: 28, // 27.95, 26.72
        minTemperature: 27
      }
    ]

    const { daily: actual } = await fetchWeatherDataForCity(
      defaultCities[0],
      mapApiTimestamp(1725688800),
      fakeFetcher
    )

    expect(actual).toHaveLength(expected.length)

    actual.forEach((actualItem, index) => {
      Object.keys(actualItem).forEach((key) => {
        if (key === 'id') return
        expect(actualItem[key]).toEqual(expected[index][key])
      })
    })
  })
})
