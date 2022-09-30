import { useContext } from "react"
import { userContext } from "./Context"

export default function Profile() {
  const { user } = useContext(userContext)

  return (
    <div>
      Profile page for User: {user ? user.email : 'no loged in'}
    </div>
  )
}