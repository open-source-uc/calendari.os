'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import supabase from '@/utils/supabase/client'

function IsAuthenticated<T>(Component: React.ComponentType<T>) {
  return function IsAdmin(props: T) {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const router = useRouter()

    useEffect(() => {
      ;(async () => {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) return router.push('/login')

        setIsLoading(false)
      })()
    }, [router])

    if (isLoading) return <h1>Cargando...</h1>

    return <Component {...props!} />
  }
}

export default IsAuthenticated
