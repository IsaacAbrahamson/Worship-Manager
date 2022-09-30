import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { userContext } from './pages/Context'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Services from './pages/Services'
import Options from './pages/Options'
import People from './pages/People'
import Songs from './pages/Songs'

function App() {
  const { user, isLoaded } = useContext(userContext)

  return (
    <div className='app'>
      {isLoaded && (
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Navigate replace to={user.email ? '/dashboard' : '/login'} />} />
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={<Navigate replace to="/dashboard/services" />} />
            <Route path='/dashboard/services' element={<Services />} />
            <Route path='/dashboard/people' element={<People />} />
            <Route path='/dashboard/songs' element={<Songs />} />
            <Route path='/dashboard/options' element={<Options />} />
            <Route path='/dashboard/profile' element={<Profile />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  )
}

export default App
