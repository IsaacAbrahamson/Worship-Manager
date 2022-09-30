import { createContext, PropsWithChildren, useEffect, useState } from "react"
import { UserInterface, ContextInterface } from '../types'

export const userContext = createContext<ContextInterface>({ user: {}, isLoaded: false })

export default function Context(props: PropsWithChildren<any>) {
  const [context, setContext] = useState<ContextInterface>({ user: {}, isLoaded: false })

  useEffect(() => {
    getUser()
  }, [])

  async function getUser() {
    const res: Response = await fetch('/api/auth/user', { credentials: 'include' })
    const user: UserInterface = await res.json()
    setContext({ user, isLoaded: true })
  }

  return (
    <userContext.Provider value={context!}>
      {props.children}
    </userContext.Provider>
  )
}