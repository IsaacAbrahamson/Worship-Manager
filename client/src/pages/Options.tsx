import { useContext } from "react"
import { userContext } from "./Context"

export default function Options() {
  const { user } = useContext(userContext)

  return (
    <div>
      Options page for User: {user ? user.email : 'no loged in'}
    </div>
  )
}