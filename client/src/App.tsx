import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Services from './pages/Services'
import Options from './pages/Options'
import People from './pages/People'
import Songs from './pages/Songs'
import { UserInterface } from './types'

function App() {
  const [user, setUser] = useState<UserInterface | undefined>()
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  useEffect(() => {
    verifyUser()
  }, [])

  async function verifyUser() {
    const res: Response = await fetch('/api/auth/user', { credentials: 'include' })
    if (res.status === 200) {
      const loggedInUser: UserInterface = await res.json()
      setUser(loggedInUser)
    }
    setIsLoaded(true)
  }

  function updateUser(newUser: UserInterface): void {
    setUser(newUser)
  }

  return (
    <div className='app'>
      {/* Make sure user has been verified before redirecting */}
      {isLoaded && (
        <BrowserRouter>
          <Routes>
            {/* Redirect to dashboard if logged in else redirect to login */}
            <Route path='/' element={<Navigate replace to={user ? '/dashboard' : '/login'} />} />
            {/* If user is logged in redirect them from login page */}
            <Route path='/login' element={!user ? <Login updateUser={updateUser} /> : <Navigate replace to={'/dashboard'} />} />

            {/* Only have dashboard routes if user is logged in */}
            {user && (
              <>
                <Route path='/dashboard' element={<Navigate replace to="/dashboard/services" />} />
                <Route path='/dashboard/services' element={<Services user={user} />} />
                <Route path='/dashboard/people' element={<People user={user} />} />
                <Route path='/dashboard/songs' element={<Songs user={user} />} />
                <Route path='/dashboard/options' element={<Options user={user} />} />
                <Route path='/dashboard/profile' element={<Profile user={user} />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      )}
    </div>
  )
}

export default App
