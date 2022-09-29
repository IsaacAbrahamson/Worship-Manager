import { useContext } from "react"
import { userContext } from "./Context"

export default function Home() {
  const user = useContext(userContext)

  return (
    <div>
      Home page for User: {user ? user.email : 'no loged in'}
    </div>
  )
}