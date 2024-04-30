'use server'

import createClient from '@/utils/supabase/server'

export interface GoogleCalendar {
  id: string
  summary: string
  description: string
  timeZone: string
  colorId: string
  backgroundColor: string
  foregroundColor: string
}

const API_URL = 'https://www.googleapis.com/calendar/v3/users/me/calendarList'

export const getCalendarsFromGoogleAccount = async () => {
  const supabase = createClient()

  const userResponse = await supabase.auth.getUser()

  const { user } = userResponse.data

  if (!user) throw new Error('User not found')

  const { data } = await supabase
    .from('google')
    .select('token')
    .eq('user_id', user.id)
    .single()

  if (!data) throw new Error('Google account not found')

  const { token } = data

  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const { items: calendars } = await (response.json() as Promise<{
    items: GoogleCalendar[]
  }>)

  if (!calendars) return []

  // map calendars to only the necessary fields
  return calendars.map(
    ({
      id,
      summary,
      description,
      timeZone,
      colorId,
      backgroundColor,
      foregroundColor,
    }) => ({
      id,
      summary,
      description,
      timeZone,
      colorId,
      backgroundColor,
      foregroundColor,
    })
  )
}

export const getIsGoogleConnected = async () => {
  const supabase = createClient()

  const userResponse = await supabase.auth.getUser()

  const { user } = userResponse.data

  if (!user) throw new Error('User not found')

  const { data } = await supabase
    .from('google')
    .select()
    .eq('user_id', user.id)
    .single()

  return !!data
}
