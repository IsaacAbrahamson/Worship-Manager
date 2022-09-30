import { useNavigate } from "react-router-dom"

export default function Sidebar() {
  const navigate = useNavigate()

  async function logout() {
    const res = await fetch('/api/auth/logout')
    if (res.status === 200) {
      alert('You have been logged out!')
      navigate('/login')
    }
  }

  return (
    <div className="sidebar">
      <button onClick={logout}>Logout</button>
    </div>
  )
}