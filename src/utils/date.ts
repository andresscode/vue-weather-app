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
