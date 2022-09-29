import { createContext, PropsWithChildren, useEffect, useState } from "react"
import { UserInterface } from '../types'

export const userContext = createContext<Partial<UserInterface>>({})

export default function Context(props: PropsWithChildren<any>) {
  const [user, setUser] = useState<UserInterface>()

  useEffect(() => {
    getUser()
  }, [])

  async function getUser() {
    const res: Response = await fetch('/api/auth/user', { credentials: 'include' })
    const data: UserInterface = await res.json()
    setUser(data)
  }

  return (
    <userContext.Provider value={user!}>
      {props.children}
    </userContext.Provider>
  )
}