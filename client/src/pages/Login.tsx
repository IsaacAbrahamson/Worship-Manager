import { useContext, useState } from 'react'
import { UserInterface } from '../types'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../UserContext'
import AppPicture from '../assets/app.png'
import { ReactComponent as Logo } from '../assets/logo.svg'
import '../styles/login.scss'

export default function Login() {
  const { updateUser } = useContext(UserContext)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const navigate = useNavigate()

  async function login(e: React.FormEvent) {
    e.preventDefault()

    const res: Response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      })
    })

    if (res.status === 200) {
      const user: UserInterface = await res.json()
      updateUser(user)
      navigate('/dashboard')
    } else {
      // incorrect login
      alert('Email or password is incorrect!')
    }
  }

  return (
    <div className='login'>
      <div className="split login-split">
        <div className="logo">
          <Logo />
          <h1>Worship Manager</h1>
        </div>
        <div className="login-form">
          <h3>Login</h3>
          <form onSubmit={login}>
            <label htmlFor='email'>Email:</label>
            <input type="email" name='email' value={email} autoFocus required onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor='password'>Password:</label>
            <input type="password" name='password' value={password} required onChange={(e) => setPassword(e.target.value)} />
            <button onClick={login}>Log In</button>
          </form>
          <p className='alternate-login'>Not a user? <Link to='/register'>Register for free</Link></p>
        </div>
      </div>

      <div className="split intro-split">
        <div className="intro-content">
          <div className="intro-text">
            <h2>Focus on making music.</h2>
            <p>Worship Manager tracks all of your past and upcoming services, musicians, and songs so you can can spend more time doing what you love.</p>
          </div>
          <div className='app-picture'>
            <img src={AppPicture} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}