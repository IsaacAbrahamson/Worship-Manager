import { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import UserContext from '../UserContext'
import { useNavigate } from 'react-router-dom'

export default function Options() {
  const { user, logoutUser } = useContext(UserContext)
  const navigate = useNavigate()

  async function logout() {
    const res = await fetch('/api/auth/logout')
    if (res.status === 200) {
      logoutUser()
      navigate('/login')
    }
  }

  return (
    <div className='page'>
      <Sidebar />
      <div className="page-content">
        Profile page for User: {user!.email}
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  )
}