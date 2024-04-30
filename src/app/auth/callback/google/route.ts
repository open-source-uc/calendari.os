import createClient from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  const supabase = createClient()

  if (code) await supabase.auth.exchangeCodeForSession(code)

  const sessionData = await supabase.auth.getSession()
  const userData = await supabase.auth.getUser()

  const { session } = sessionData.data!
  const { user } = userData.data!

  if (!session || !user) return NextResponse.redirect(`${origin}/login`)

  const providerToken = session!.provider_token

  await supabase.from('google').delete().eq('user_id', user!.id)

  await supabase.from('google').insert({
    user_id: user!.id,
    token: providerToken,
  })

  // URL to redirect to after sign up process completes
  return NextResponse.redirect(`${origin}/calendars`)
}
