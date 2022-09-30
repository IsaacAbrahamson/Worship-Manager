import Sidebar from '../components/Sidebar'
import { useContext } from 'react'
import UserContext from '../UserContext'

export default function Options() {
  const { user } = useContext(UserContext)

  return (
    <div>
      People page for User: {user!.email}
      <Sidebar />
    </div>
  )
}