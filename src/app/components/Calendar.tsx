'use client'

import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import esLocale from '@fullcalendar/core/locales/es'

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
      plugins={[timeGridPlugin]}
      initialView={'timeGridCustomDays'}
      headerToolbar={{
        left: 'title',
        right: 'prev,next',
      }}
      locale={esLocale}
      nowIndicator={true}
      eventSources={[{ url: '' }]}
      views={{
        timeGridCustomDays: {
          type: 'timeGrid',
          duration: { days: viewDays },
        },
      }}
      titleFormat={{ year: 'numeric', month: 'long' }}
    />
  )
}
