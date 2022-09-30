import { useContext, useState } from 'react'
import { UserInterface } from '../types'
import { useNavigate } from 'react-router-dom'
import UserContext from '../UserContext'

export default function Login() {
  const { updateUser } = useContext(UserContext)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const navigate = useNavigate()

  async function login() {
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
    const user: UserInterface = await res.json()
    updateUser!(user)
    navigate('/dashboard')
  }

  return (
    <div>
      <h1>Login</h1>
      <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  )
}