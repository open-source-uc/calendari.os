import { useState, useEffect } from 'react'
import { signInWithGoogle } from '@/utils/connections'
import {
  getCalendarsFromGoogleAccount,
  GoogleCalendar,
  getIsGoogleConnected,
} from '@/utils/googleCalendar'

export default function AddGoogleCalendar({
  calendars,
  onAddCalendar,
}: {
  calendars: string[]
  onAddCalendar: (id: string) => void
}) {
  const addCalendar = async (data: FormData) => {
    const calendarId = data.get('calendar') as string

    onAddCalendar(calendarId)
  }

  const [isGoogleConnected, setIsGoogleConnected] = useState<boolean | null>(
    null
  )
  const [googleCalendars, setGoogleCalendars] = useState<GoogleCalendar[]>([])
  const [availableCalendars, setAvailableCalendars] = useState<
    GoogleCalendar[]
  >([])

  useEffect(() => {
    getIsGoogleConnected().then(setIsGoogleConnected)
  }, [])

  useEffect(() => {
    if (!isGoogleConnected) return

    getCalendarsFromGoogleAccount().then(setGoogleCalendars)
  }, [isGoogleConnected])

  useEffect(() => {
    const filteredCalendars = googleCalendars.filter(
      ({ id }) => !calendars.find((calendarId) => calendarId === id)
    )

    setAvailableCalendars(filteredCalendars)
  }, [googleCalendars, calendars])

  if (!isGoogleConnected)
    return (
      <button
        disabled={isGoogleConnected == null}
        onClick={() => signInWithGoogle()}
      >
        Conectar con Google
      </button>
    )

  return (
    <form action={addCalendar}>
      <select name="calendar">
        {availableCalendars.map(({ id, summary }) => (
          <option key={id} value={id}>
            {summary}
          </option>
        ))}
      </select>
      <button type="submit" disabled={availableCalendars.length === 0}>
        Añadir
      </button>
    </form>
  )
}
