'use client'

import supabase from '@/utils/supabase/client'
import { useState, FormEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.hash.substring(1))

    const refreshToken = urlParams.get('refresh_token')

    if (!refreshToken) return router?.push('/')
  }, [router])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setIsLoading(true)

    const urlParams = new URLSearchParams(window.location.hash.substring(1))

    const refreshToken = urlParams.get('refresh_token')!

    if (!refreshToken) return router?.push('/')

    await supabase.auth.refreshSession({ refresh_token: refreshToken })

    // TODO: Limit client api to only allow password update when there is no password
    const { error } = await supabase.auth.updateUser({ password })

    setIsLoading(false)

    if (!error) {
      alert('Contraseña establecida correctamente')
      router!.push('/calendars')
      return
    }

    if (error.name === 'AuthWeakPasswordError') {
      alert(
        'La contraseña es muy débil, debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial'
      )
      return
    }

    alert('Ocurrió un error, por favor intenta de nuevo')
  }

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value)

  return (
    <article>
      <h1>Establecer contraseña</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChangePassword}
          value={password}
          type="password"
          name="password"
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Cargando...' : 'Establecer'}
        </button>
      </form>
    </article>
  )
}
