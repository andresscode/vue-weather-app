import type { ApiResponseDTO, CityModel, DayForecastModel, HourForecastModel } from '@/types'
import { mapApiTimestamp, removeTimeFromISOString } from './date'
import response from './response.json'

export const fetchWeatherDataForCity = async (
  city: CityModel,
  now: Date,
  fetcher: (city: CityModel) => Promise<ApiResponseDTO>
): Promise<{ hourly: HourForecastModel[]; daily: DayForecastModel[] }> => {
  // Fetch raw data from the weather API as it is
  const responseDTO = await fetcher(city)

  // The API returns hourly forecasts in 3hrs-steps. Meaning we can display
  // a total of 8 forecasts to give the user data for the next 24 hours.
  //
  // 24hrs / 3hrs = 8
  //
  const maxHourlyForecastsInADay = 8

  // The first 8 items from the response.list field will be mapped and store here.
  // The user will see the content from this list in the 'Next hours' component.
  const hourlyList: HourForecastModel[] = []

  // This key represents today date string that must not be present in the
  // array that will display the data for 'Next 5 days'
  //
  // Format: 2024-01-01
  const nowKey = removeTimeFromISOString(now.toISOString())

  // This map groups the forecasts by day to be further processed.
  // The MOST interesting part of this test.
  const daysMap = new Map<
    string,
    {
      index: number
      dt: number
      temps: number[]
      weathers: { icon: string; main: string }[]
    }
  >()

  responseDTO.list.forEach((item, index) => {
    // Map and collect first 8 hourly forecasts
    if (index < maxHourlyForecastsInADay) {
      hourlyList.push({
        id: crypto.randomUUID(),
        temperature: Math.round(item.main.temp),
        pop: item.pop * 100, // turn into percentange
        iconCode: item.weather[0].icon,
        time: mapApiTimestamp(item.dt)
      })
    }

    // This key serves to group the ites for each day in the 'daysMap'. Its format
    // must be the same as the one used in 'nowKey', i.e., 2024-10-10
    const dayKey = removeTimeFromISOString(mapApiTimestamp(item.dt).toISOString())

    // Days not seen before must be added for the first time to the 'daysMap':
    //
    // index: this field will make sorting easier later, a convinience field
    // dt: timestamp of the current item to later turn it into a date
    // temps: array of all the temperatures of the forecasts in the same day
    // weathers: array of all weathers seen so far for a single day
    //
    if (dayKey !== nowKey && !daysMap.has(dayKey)) {
      daysMap.set(dayKey, {
        index: index,
        dt: item.dt,
        temps: [],
        weathers: []
      })
    }

    const currDayFromMap = daysMap.get(dayKey)

    // When a forecast has a day seen already we collect its temperature and weather
    currDayFromMap?.temps.push(item.main.temp)
    currDayFromMap?.weathers.push({ icon: item.weather[0].icon, main: item.weather[0].main })
  })

  const dailyList: DayForecastModel[] = [...daysMap.values()]
    .sort((a, b) => a.index - b.index)
    .map((day) => {
      const mostSeen = findLongestWeatherSubsequence(day.weathers)
      const iconId = getIconNumbers(mostSeen.icon)

      return {
        id: crypto.randomUUID(),
        iconCode: `${iconId}d`, // use by default always day icons
        date: mapApiTimestamp(day.dt),
        message: `${mostSeen.main} throughout the day.`,
        maxTemperature: Math.round(Math.max(...day.temps)),
        minTemperature: Math.round(Math.min(...day.temps))
      }
    })

  return { hourly: hourlyList, daily: dailyList }
}

// This function finds the longest subsequence of weathers within a day.
//
// For example, the weathers sequence: [01n, 01n, 03n, 04d, 04d, 04d, 03d, 01n]
// has 01 and 04 three times each but, because 04 appearch in sequence, I'm
// giving a higher priority to subsequences because the perception of weather
// could be highly affected by how long the same type of weather last cotinuosly
function findLongestWeatherSubsequence(arr: { icon: string; main: string }[]): {
  icon: string
  main: string
} {
  let maxCount = 1
  let mostSeen = arr[0]

  let currentCount = 1
  let currentWeather = arr[0]

  for (let i = 1; i < arr.length; i++) {
    const currIconNumbers = getIconNumbers(arr[i].icon)
    if (currentWeather.icon.includes(currIconNumbers)) {
      currentCount++
    } else {
      if (currentCount > maxCount) {
        maxCount = currentCount
        mostSeen = currentWeather
      }
      currentWeather = arr[i]
      currentCount = 1
    }
  }

  if (currentCount > maxCount) {
    mostSeen = currentWeather
  }

  return mostSeen
}

// Get don't care if the weather icon is for day or night
function getIconNumbers(iconCode: string) {
  return iconCode.substring(0, 2)
}

// Uset this fetcher to query the real API
export const apiFetcher = async (city: CityModel): Promise<ApiResponseDTO> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${import.meta.env.VITE_API_KEY}&units=metric`
  )

  if (response.status !== 200) {
    throw new Error(
      `Something went wrong quering the Weather API: Status response ${response.status}.`
    )
  }

  const decoded: ApiResponseDTO = await response.json()

  return decoded
}

// Use this fetcher only for testing purposes
export const fakeFetcher = async (city: CityModel): Promise<ApiResponseDTO> => {
  console.log(`City received: ${city.name}`)
  return response as ApiResponseDTO
}
