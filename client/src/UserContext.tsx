import { createContext, PropsWithChildren, useState } from 'react'
import { ContextInterface, UserInterface } from './types'

const UserContext = createContext<ContextInterface>({} as ContextInterface)

export function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserInterface | undefined>()

  function updateUser(newUser: UserInterface): void {
    setUser(newUser)
  }

  function logoutUser(): void {
    setUser(undefined)
  }

  return (
    <UserContext.Provider value={{ user, updateUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext


