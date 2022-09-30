import { useContext } from "react"
import { userContext } from "./Context"

export default function Songs() {
  const { user } = useContext(userContext)

  return (
    <div>
      Songs page for User: {user ? user.email : 'no loged in'}
    </div>
  )
}