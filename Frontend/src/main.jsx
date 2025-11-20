import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './components/authProvider.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </AuthProvider>,
)
