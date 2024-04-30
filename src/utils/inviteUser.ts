'use server'

import createClient from '@/utils/supabase/server'
import verifyIsUserAdmin from '@/utils/verifyIsUserAdmin'

const inviteUser = async (email: string) => {
  if (!email) throw new Error('Email is required')

  const isUserAdmin = await verifyIsUserAdmin()

  if (!isUserAdmin) throw new Error('User is not an admin')

  const supabase = createClient()

  const { error } = await supabase.auth.admin.inviteUserByEmail(email, {
    redirectTo: 'http://localhost:3000/invitation',
  })

  if (error) throw new Error(error.message)
}

export default inviteUser
