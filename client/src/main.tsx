import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { UserProvider } from './UserContext'
import './styles/main.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
)
