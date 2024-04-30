'use client'

import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function MiniCalendar() {
  const [value, onChange] = useState<Value>(new Date())

  return <Calendar onChange={onChange} value={value} />
}
