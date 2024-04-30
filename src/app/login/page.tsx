'use client'

import { useState, FormEvent } from 'react'
import { signInWithGoogle, signInWithEmail } from '@/utils/connections'
import type { AuthError } from '@supabase/supabase-js'

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [user, setUser] = useState<{
    email: string
    password: string
  }>({ email: '', password: '' })

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    'use client'

    event.preventDefault()
    setIsLoading(true)

    const { email, password } = user

    try {
      await signInWithEmail(email, password)
    } catch (error: unknown) {
      if ((error as AuthError)?.message === 'Invalid login credentials') {
        alert('Usuario o contraseña incorrectos')
      } else {
        alert('Ocurrió un error, por favor intenta de nuevo')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <article>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={user.email}
          onChange={({ target }) => setUser({ ...user, email: target.value })}
        />

        <label htmlFor="Password">Password</label>
        <input
          type="password"
          name="password"
          id="Password"
          value={user.password}
          onChange={({ target }) =>
            setUser({ ...user, password: target.value })
          }
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Cargando...' : 'Submit'}
        </button>
      </form>
      <button onClick={() => signInWithGoogle()}>Google</button>
    </article>
  )
}
