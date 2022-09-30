import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Context from './pages/Context'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Context>
      <App />
    </Context>
  </React.StrictMode>
)
