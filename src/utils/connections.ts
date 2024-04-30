'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import createClient from '@/utils/supabase/server'

export const signInWithGoogle = async () => {
  const origin = headers().get('origin')

  const supabase = createClient()

  const { data } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback/google`,
      scopes: 'https://www.googleapis.com/auth/calendar.readonly',
    },
  })

  return redirect(data.url!)
}

export const signInWithEmail = async (email: string, password: string) => {
  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error

  return redirect('/calendars')
}
