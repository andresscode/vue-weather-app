export function now() {
  const date = new Date()
  const month = date.toLocaleString('en-US', { month: 'short' })
  const day = date.getDate()
  const time = date.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  })
  return `${month} ${day} ${time}`
}

export function formatHourForecastTime(date: Date) {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC'
  })
}

export function formatDayForecastDate(date: Date) {
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC'
  })
}

export function mapApiTimestamp(timestamp: number) {
  return new Date(Math.round(timestamp * 1000)) // JavaScript expects millis
}

export function removeTimeFromISOString(datetime: string) {
  return datetime.split('T')[0]
}

export function isMidnightInTimezone(timestamp: number, timezoneOffsetInSeconds: number) {
  // Create a Date object from the timestamp (in milliseconds)
  const date = new Date(timestamp * 1000)

  // Convert the timezone offset to milliseconds
  const timezoneOffsetInMs = timezoneOffsetInSeconds * 1000

  // Adjust the date to the target timezone
  const localDate = new Date(date.getTime() + timezoneOffsetInMs)

  // Extract hours, minutes, and seconds
  const hours = localDate.getUTCHours()
  const minutes = localDate.getUTCMinutes()
  const seconds = localDate.getUTCSeconds()

  // Check if the time is 00:00:00
  return hours === 0 && minutes === 0 && seconds === 0
}
