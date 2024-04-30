'use client'

import React, { useEffect, useState } from 'react'
import timeGridPlugin from '@fullcalendar/timegrid'
import esLocale from '@fullcalendar/core/locales/es'
import FullCalendar from '@fullcalendar/react'
import googleCalendarPlugin from '@fullcalendar/google-calendar'

export default function Calendar() {
  const [viewDays, setViewDays] = useState(3)

  const handleWindowResize = () => {
    if (window.outerWidth > 1024) {
      setViewDays(7)
    } else if (window.outerWidth > 768) {
      setViewDays(5)
    } else if (window.outerWidth > 600) {
      setViewDays(4)
    } else {
      setViewDays(3)
    }
  }

  useEffect(() => {
    handleWindowResize()
    window.addEventListener('resize', handleWindowResize)
  }, [])

  return (
    <FullCalendar
      plugins={[timeGridPlugin, googleCalendarPlugin]}
      initialView={'timeGridCustomDays'}
      headerToolbar={{
        left: 'title',
        right: 'prev,next',
      }}
      locale={esLocale}
      nowIndicator={true}
      views={{
        timeGridCustomDays: {
          type: 'timeGrid',
          duration: { days: viewDays },
        },
      }}
      titleFormat={{ year: 'numeric', month: 'long' }}
      dayHeaderFormat={{ weekday: 'short', day: 'numeric' }}
      firstDay={1}
      googleCalendarApiKey={process.env.NEXT_PUBLIC_API_KEY_GOOGLE_CALENDAR}
      eventSources={[
        {
          googleCalendarId: process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID_1,
          className: 'Blocks',
          backgroundColor: '#1787C5',
        },
      ]}
    />
  )
}
