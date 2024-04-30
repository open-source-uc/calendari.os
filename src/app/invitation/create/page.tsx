'use client'

import { FormEvent, useState } from 'react'
import inviteUser from '@/utils/inviteUser'
import IsAdmin from '@/components/IsAdmin'

function Page() {
  const [email, setEmail] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setIsLoading(true)

    await inviteUser(email)

    setEmail('')
    setIsLoading(false)
  }

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value)

  return (
    <article>
      <h1>Invitar usuario</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            onChange={handleChangeEmail}
            value={email}
            type="email"
            name="email"
            required
          />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Cargando' : 'Invitar'}
        </button>
      </form>
    </article>
  )
}

export default IsAdmin(Page)
