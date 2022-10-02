import Sidebar from '../components/Sidebar'
import { useContext } from 'react'
import UserContext from '../UserContext'

export default function Options() {
  const { user } = useContext(UserContext)

  return (
    <div className='page'>
      <Sidebar activePage='options' />
      <div className="page-content">
        Options page for User: {user!.email}
      </div>
    </div>
  )
}