import { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import UserContext from '../UserContext'

export default function Options() {
  const { user } = useContext(UserContext)

  return (
    <div>
      Profile page for User: {user!.email}
      <Sidebar />
    </div>
  )
}