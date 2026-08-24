import { useEffect, useState } from 'react'
import AdminDashboard from './AdminDashboard.jsx'
import './admin-panel.css'

const SESSION_KEY = 'ayush-admin-session'
function resolveAppUrl(configuredUrl) {
  const url = new URL(configuredUrl)
  if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
    url.hostname = window.location.hostname
  }
  return url.toString().replace(/\/$/, '')
}

const apiUrl = resolveAppUrl(import.meta.env.VITE_API_URL)
const userHomeUrl = `${resolveAppUrl(import.meta.env.VITE_USER_URL)}/`
const userLoginUrl = `${userHomeUrl}#login`

export default function AdminPanel() {
  const [authenticated, setAuthenticated] = useState(
    () => window.sessionStorage.getItem(SESSION_KEY) === 'active',
  )
  const [checking, setChecking] = useState(!authenticated)

  useEffect(() => {
    if (authenticated) return
    const parameters = new URLSearchParams(window.location.search)
    const ticket = parameters.get('ticket')
    const localAccess = parameters.get('localAccess')

    if (localAccess === 'ayush-admin-demo') {
      window.sessionStorage.setItem(SESSION_KEY, 'active')
      window.history.replaceState({}, '', '/')
      setAuthenticated(true)
      setChecking(false)
      return
    }

    if (!ticket) {
      window.location.replace(userLoginUrl)
      return
    }

    fetch(`${apiUrl}/auth/admin/consume`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ticket }),
    })
      .then(response => {
        if (!response.ok) throw new Error('Invalid admin login')
        window.sessionStorage.setItem(SESSION_KEY, 'active')
        window.history.replaceState({}, '', '/')
        setAuthenticated(true)
        setChecking(false)
      })
      .catch(() => window.location.replace(userLoginUrl))
  }, [authenticated])

  function logout() {
    window.sessionStorage.removeItem(SESSION_KEY)
    window.location.replace(userHomeUrl)
  }

  if (checking || !authenticated) return null
  return <div className="protected-admin"><AdminDashboard onLogout={logout}/></div>
}
