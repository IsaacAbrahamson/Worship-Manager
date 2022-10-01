import { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import UserContext from '../UserContext'

export default function Options() {
  const { user } = useContext(UserContext)
  console.log(user)

  return (
    <div className='page'>
      <Sidebar />
      <div className="page-content">
        Services page for User: {user!.email}
      </div>
    </div>
  )
}