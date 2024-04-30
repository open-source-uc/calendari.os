'use server'

import createClient from '@/utils/supabase/server'

export const getUsersCalendars = async () => {
  const supabase = createClient()

  const userResponse = await supabase.auth.getUser()

  const { user } = userResponse.data

  if (!user) throw new Error('User not found')

  const { data } = await supabase
    .from('calendars')
    .select('calendar_id')
    .eq('user_id', user.id)

  if (!data) return []

  return data.map(({ calendar_id: id }) => id)
}

export const addUserCalendar = async (calendarId: string) => {
  if (!calendarId) throw new Error('Calendar ID is required')

  const supabase = createClient()

  const userResponse = await supabase.auth.getUser()

  const { user } = userResponse.data

  if (!user) throw new Error('User not found')

  await supabase.from('calendars').insert({
    user_id: user.id,
    calendar_id: calendarId,
  })
}

export const deleteUserCalendar = async (calendarId: string) => {
  if (!calendarId) throw new Error('Calendar ID is required')

  const supabase = createClient()

  const userResponse = await supabase.auth.getUser()

  const { user } = userResponse.data

  if (!user) throw new Error('User not found')

  await supabase
    .from('calendars')
    .delete()
    .eq('user_id', user.id)
    .eq('calendar_id', calendarId)
}

export const getAllCalendars = async () => {
  const supabase = createClient()

  const { data } = await supabase.from('calendars').select('calendar_id')

  if (!data) return []

  return data?.map(({ calendar_id: id }) => id)
}
