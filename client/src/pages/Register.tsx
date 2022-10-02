import { useState } from 'react'
import { UserInterface } from '../types'
import { Link, useNavigate } from 'react-router-dom'
import AppPicture from '../assets/app.png'
import Background from '../assets/background.jpg'
import { ReactComponent as Logo } from '../assets/logo.svg'
import '../styles/login.scss'

export default function Register() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConf, setPasswordConf] = useState<string>('')
  const [first_name, setFirstName] = useState<string>('')
  const [last_name, setLastName] = useState<string>('')
  const navigate = useNavigate()

  async function register(e: React.FormEvent) {
    e.preventDefault()

    // validate
    if (password !== passwordConf) return alert('Passwords do not match!')

    const res: Response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
        first_name,
        last_name
      })
    })

    if (res.status === 200) {
      const user: UserInterface = await res.json()
      navigate('/login')
    } else {
      const err = await res.text()
      alert(err)
    }
  }

  return (
    <div className='login' style={{ backgroundImage: `url(${Background})` }}>
      <div className="split login-split">
        <div className="logo">
          <Logo />
          <h1>Worship Manager</h1>
        </div>
        <div className="login-form">
          <h3>Register</h3>
          <form onSubmit={register}>
            <label htmlFor='email'>Email:</label>
            <input type="email" name='email' value={email} required onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor='password'>Password:</label>
            <input type="password" name="password" value={password} required onChange={(e) => setPassword(e.target.value)} />
            <label htmlFor='passwordConf'>Confirm Password:</label>
            <input type="password" name="passwordConf" value={passwordConf} required onChange={(e) => setPasswordConf(e.target.value)} />
            <label htmlFor='first_name'>First Name:</label>
            <input type="text" name="first name" value={first_name} required onChange={(e) => setFirstName(e.target.value)} />
            <label htmlFor='last_name'>Last Name:</label>
            <input type="text" name="last name" value={last_name} required onChange={(e) => setLastName(e.target.value)} />
            <button onClick={register}>Register</button>
          </form>
          <p className='alternate-login'>Already a user? <Link to='/login'>Back to login</Link></p>
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