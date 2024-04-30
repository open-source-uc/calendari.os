import { getAllCalendars } from '@/utils/calendars'

export default async function Home() {
  const calendars = await getAllCalendars()

  return (
    <main>
      <h1>Calendars</h1>
      <ul>
        {calendars.map((id) => (
          <li key={id}>{id}</li>
        ))}
      </ul>
    </main>
  )
}
