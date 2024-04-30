'use client'

import verifyIsUserAdmin from '@/utils/verifyIsUserAdmin'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

function IsAdmin<T>(Component: React.ComponentType<T>) {
  return function IsAdmin(props: T) {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const router = useRouter()

    useEffect(() => {
      ;(async () => {
        const isAdmin = await verifyIsUserAdmin()

        if (!isAdmin) return router.push('/login')

        setIsLoading(false)
      })()
    }, [router])

    if (isLoading) return <h1>Cargando...</h1>

    return <Component {...props!} />
  }
}

export default IsAdmin
