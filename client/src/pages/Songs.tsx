import { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import UserContext from '../UserContext'

export default function Options() {
  const { user } = useContext(UserContext)

  return (
    <div className='page'>
      <Sidebar activePage='songs' />
      <div className="page-content">
        Songs page for User: {user!.email}
      </div>
    </div>
  )
}