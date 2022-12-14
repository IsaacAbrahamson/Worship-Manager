import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../UserContext'
import { ReactComponent as Logo } from '../assets/logo.svg'
import { ReactComponent as ServiceIcon } from '../assets/service-icon.svg'
import { ReactComponent as PeopleIcon } from '../assets/people-icon.svg'
import { ReactComponent as SongsIcon } from '../assets/songs-icon.svg'
import { ReactComponent as OptionsIcon } from '../assets/options-icon.svg'
import { ReactComponent as LogoutIcon } from '../assets/logout.svg'
import '../styles/sidebar.scss'

interface Props {
  activePage: string
}

export default function Sidebar(props: Props) {
  const { user, logoutUser } = useContext(UserContext)
  const navigate = useNavigate()

  // Truncate strings
  const name = `${user!.first_name} ${user!.last_name}`.slice(0, 13).concat('...')
  const email = user!.email.slice(0, 23).concat('...')

  async function logout() {
    const res = await fetch('/api/auth/logout')
    if (res.status === 200) {
      logoutUser()
      navigate('/login')
    }
  }

  return (
    <div className='sidebar'>
      <div className="logo">
        <Logo />
        <h1>Worship Manager</h1>
      </div>
      <div className="links">
        <Link to='/dashboard/services' className={`sidebar-link ${props.activePage === 'services' ? 'active' : ''}`}>
          <ServiceIcon />
          <p>Services</p>
        </Link>
        <Link to='/dashboard/people' className={`sidebar-link ${props.activePage === 'people' ? 'active' : ''}`}>
          <PeopleIcon />
          <p>People</p>
        </Link>
        <Link to='/dashboard/songs' className={`sidebar-link ${props.activePage === 'songs' ? 'active' : ''}`}>
          <SongsIcon />
          <p>Songs</p>
        </Link>
        <Link to='/dashboard/options' className={`sidebar-link ${props.activePage === 'options' ? 'active' : ''}`}>
          <OptionsIcon />
          <p>Options</p>
        </Link>
      </div>
      <div className="profile-card">
        <div className='profile-card-text'>
          <p className="profile-card--name">{name}</p>
          <p className="profile-card--email">{email}</p>
        </div>
        <div className='profile-logout' onClick={logout}><LogoutIcon /></div>
      </div>
    </div>
  )
}