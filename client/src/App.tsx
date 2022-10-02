import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { UserInterface } from './types'
import UserContext from './UserContext'
import Login from './pages/Login'
import Services from './pages/Services'
import Options from './pages/Options'
import People from './pages/People'
import Songs from './pages/Songs'
import Register from './pages/Register'
import ServiceDetail from './pages/ServiceDetail'

function App() {
  const { user, updateUser } = useContext(UserContext)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  useEffect(() => {
    verifyUser()
  }, [])

  async function verifyUser() {
    const res: Response = await fetch('/api/auth/user', { credentials: 'include' })
    if (res.status === 200) {
      const loggedInUser: UserInterface = await res.json()
      updateUser(loggedInUser)
    }
    setIsLoaded(true)
  }

  return (
    <div className='app'>
      {/* Make sure user has been verified before redirecting */}
      {isLoaded && (
        <BrowserRouter>
          <Routes>
            {/* Redirect to dashboard if logged in else redirect to login */}
            <Route path='/' element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />
            {/* If user is logged in redirect them from login and register page */}
            <Route path='/login' element={!user ? <Login /> : <Navigate to={'/dashboard'} replace />} />
            <Route path='/register' element={!user ? <Register /> : <Navigate to={'/dashboard'} replace />} />

            {/* Only have dashboard routes if user is logged in */}
            {user && (
              <>
                <Route path='/dashboard' element={<Navigate to="/dashboard/services" replace />} />
                <Route path='/dashboard/services' element={<Services />} />
                <Route path='/dashboard/services/:id' element={<ServiceDetail />} />
                <Route path='/dashboard/people' element={<People />} />
                <Route path='/dashboard/songs' element={<Songs />} />
                <Route path='/dashboard/options' element={<Options />} />
              </>
            )}
            {/* Redirect any other route back to root */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  )
}

export default App
