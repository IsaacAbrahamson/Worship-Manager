import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../UserContext'

export default function Sidebar() {
  const { logoutUser } = useContext(UserContext)
  const navigate = useNavigate()

  async function logout() {
    const res = await fetch('/api/auth/logout')
    if (res.status === 200) {
      logoutUser()
      navigate('/login')
    }
  }

  return (
    <div className='sidebar'>
      <button onClick={logout}>Logout</button>
    </div>
  )
}