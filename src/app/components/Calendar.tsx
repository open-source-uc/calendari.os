"use client"

import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";

export default function Calendar() {
  return (
    <FullCalendar
      plugins={[timeGridPlugin]}
      locale={esLocale}
      initialView="timeGridWeek"
      eventSources={[{ url: "/api/org/a/events" }]}
    />
  );
};