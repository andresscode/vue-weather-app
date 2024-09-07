import { describe, it, expect } from 'vitest'
import { formatHourForecastTime, mapApiTimestamp, now } from '../date'

describe('date', () => {
  it('formats footer datetime correctly', () => {
    const regex = /^[A-Za-z]{3} \d{1,2} \d{1,2}:\d{2}$/
    expect(regex.test(now())).toBe(true)
  })

  it('formats hour forecast time correctly', () => {
    const regex = /^\d{1,2}:\d{2} (A|P)M$/

    const amHour = new Date('2024-01-01T10:00:00Z')
    const pmHour = new Date('2024-01-01T20:00:00Z')

    expect(regex.test(formatHourForecastTime(amHour))).toBe(true)
    expect(regex.test(formatHourForecastTime(pmHour))).toBe(true)
  })

  it('maps API timestamp correctly', () => {
    const expected = '2024-09-07T06:00:00.000Z'
    const actual = mapApiTimestamp(1725688800).toISOString()
    expect(actual).toEqual(expected)
  })
})
