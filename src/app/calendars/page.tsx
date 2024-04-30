'use client'

import { useState, useEffect } from 'react'
import {
  getUsersCalendars,
  addUserCalendar,
  deleteUserCalendar,
} from '@/utils/calendars'
import AddGoogleCalendar from '@/components/AddGoogleCalentar'
import IsAuthenticated from '@/components/IsAuthenticated'

function Page() {
  const [calendars, setCalendars] = useState<string[]>([])

  useEffect(() => {
    getUsersCalendars().then(setCalendars)
  }, [])

  const createRemoveCalendar = (calendarId: string) => async () => {
    await deleteUserCalendar(calendarId)

    setCalendars(calendars.filter((id) => id !== calendarId))
  }

  const handleAddGoogleCalendar = async (calendarId: string) => {
    await addUserCalendar(calendarId)

    setCalendars([...calendars, calendarId])
  }

  return (
    <section>
      <h1>Calendarios</h1>
      <ul>
        {calendars.map((id) => (
          <li key={id}>
            {id}
            <button onClick={createRemoveCalendar(id)}>Remove</button>
          </li>
        ))}
      </ul>

      <section>
        <h2>Añadir calendario de google</h2>
        <AddGoogleCalendar
          calendars={calendars}
          onAddCalendar={handleAddGoogleCalendar}
        />
      </section>
    </section>
  )
}

export default IsAuthenticated(Page)
