import { useContext } from "react"
import { userContext } from "./Context"

export default function People() {
  const { user } = useContext(userContext)

  return (
    <div>
      People page for User: {user ? user.email : 'no loged in'}
    </div>
  )
}