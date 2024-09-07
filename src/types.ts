export type CityModel = {
  name: string
  lat: number
  lon: number
  hourlyForecast: HourForecastModel[]
  dailyForecast: DayForecastModel[]
}

export type HourForecastModel = {
  [key: string]: any
  id: string
  temperature: number
  pop: number
  iconCode: string
  time: Date
}

export type DayForecastModel = {
  [key: string]: any
  id: string
  iconCode: string
  date: Date
  message: string
  maxTemperature: number
  minTemperature: number
}

export type ApiResponseDTO = {
  list: ApiResponseItemDTO[]
}

export type ApiResponseItemDTO = {
  dt: number
  main: { temp: number }
  weather: ApiResponseWeatherItemDTO[]
  pop: number
}

export type ApiResponseWeatherItemDTO = {
  icon: string
  main: string
}

export type CityDTO = {
  name: string
  lat: number
  lon: number
}

export const defaultCities: CityModel[] = [
  {
    name: 'Rio de Janeiro',
    lat: -22.90278,
    lon: -43.2075,
    hourlyForecast: [],
    dailyForecast: []
  },
  {
    name: 'Beijing',
    lat: 39.9075,
    lon: 116.39723,
    hourlyForecast: [],
    dailyForecast: []
  },
  {
    name: 'Los Angeles',
    lat: 34.052235,
    lon: -118.243683,
    hourlyForecast: [],
    dailyForecast: []
  }
]

export const hourForecastListData: HourForecastModel[] = [
  { id: '1', temperature: 20, pop: 0, iconCode: '01d', time: new Date() },
  { id: '2', temperature: 15, pop: 2, iconCode: '02d', time: new Date() },
  { id: '3', temperature: 7, pop: 34, iconCode: '04d', time: new Date() },
  { id: '4', temperature: 12, pop: 5, iconCode: '03d', time: new Date() },
  { id: '5', temperature: 23, pop: 2, iconCode: '01d', time: new Date() },
  { id: '6', temperature: 15, pop: 2, iconCode: '02d', time: new Date() }
]

export const dayForecastListData: DayForecastModel[] = [
  {
    id: '1',
    iconCode: '01d',
    date: new Date(),
    message: 'Clear throughout the day.',
    maxTemperature: 27,
    minTemperature: 11
  },
  {
    id: '2',
    iconCode: '01d',
    date: new Date(),
    message: 'Clear throughout the day.',
    maxTemperature: 27,
    minTemperature: 11
  },
  {
    id: '3',
    iconCode: '01d',
    date: new Date(),
    message: 'Clear throughout the day.',
    maxTemperature: 27,
    minTemperature: 11
  },
  {
    id: '4',
    iconCode: '01d',
    date: new Date(),
    message: 'Clear throughout the day.',
    maxTemperature: 27,
    minTemperature: 11
  },
  {
    id: '5',
    iconCode: '01d',
    date: new Date(),
    message: 'Clear throughout the day.',
    maxTemperature: 27,
    minTemperature: 11
  }
]
