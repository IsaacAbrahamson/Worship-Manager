import Sidebar from '../components/Sidebar'
import { useContext } from 'react'
import UserContext from '../UserContext'

export default function Options() {
  const { user } = useContext(UserContext)

  return (
    <div className='page'>
      <Sidebar />
      <div className="page-content">
        People page for User: {user!.email}
      </div>
    </div>
  )
}