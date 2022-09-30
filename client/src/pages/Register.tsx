import { useContext, useState } from 'react'
import { UserInterface } from '../types'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../UserContext'

export default function Register() {
  const { updateUser } = useContext(UserContext)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConf, setPasswordConf] = useState<string>('')
  const [first_name, setFirstName] = useState<string>('')
  const [last_name, setLastName] = useState<string>('')
  const navigate = useNavigate()

  async function register() {
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
    <div>
      <h1>Register</h1>
      <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="password" placeholder="confirm password" value={passwordConf} onChange={(e) => setPasswordConf(e.target.value)} />
      <input type="text" placeholder="first name" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
      <input type="text" placeholder="last name" value={last_name} onChange={(e) => setLastName(e.target.value)} />
      <button onClick={register}>Register</button>
      <p>Already a user? <Link to='/login'>Back to login</Link></p>
    </div>
  )
}