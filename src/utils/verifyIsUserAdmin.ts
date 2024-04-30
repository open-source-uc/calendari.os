'use server'

import createClient from '@/utils/supabase/server'

const verifyIsUserAdmin = async () => {
  const supabase = createClient()

  const userResponse = await supabase.auth.getUser()

  const { user } = userResponse.data

  if (!user) return false

  const { id } = user

  const { data, error } = await supabase
    .from('roles')
    .select()
    .eq('user_id', id)
    .eq('role', 'admin')
    .single()

  if (error) return false

  return !!data
}

export default verifyIsUserAdmin
