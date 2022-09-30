import { useContext } from "react"
import { userContext } from "./Context"

export default function Services() {
  const { user } = useContext(userContext)

  return (
    <div>
      Services page for User: {user ? user.email : 'no loged in'}
    </div>
  )
}