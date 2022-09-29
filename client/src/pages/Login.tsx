import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  async function login() {
    const res = await fetch('/api/login', {
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
    const json = await res.json()
    console.log(json)
  }

  async function getUser() {
    const res = await fetch('/api/user', { credentials: 'include' })
    const json = await res.json()
    console.log(json)
  }

  return (
    <div>
      <h1>Login</h1>
      <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
      <button onClick={getUser}>Get User</button>
    </div>
  )
}