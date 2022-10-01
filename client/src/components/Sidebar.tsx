import { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../UserContext'

export default function Sidebar() {
  const { user } = useContext(UserContext)

  return (
    <div className='sidebar'>
      <h1 className='logo'>Worship Manager</h1>
      <div className="links">
        <Link to='/dashboard/services'>Services</Link>
        <Link to='/dashboard/people'>People</Link>
        <Link to='/dashboard/songs'>Songs</Link>
        <Link to='/dashboard/options'>Options</Link>
      </div>
      <div className="profile">
        <p className="profile-name">{user!.first_name} {user!.last_name}</p>
        <p className="email">{user!.email}</p>
        <Link to='/dashboard/profile'>Profile</Link>
      </div>
    </div>
  )
}