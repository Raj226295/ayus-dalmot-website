import { useState } from 'react'
import AdminDashboard from './AdminDashboard.jsx'
import './admin-panel.css'

const SESSION_KEY = 'ayush-admin-session'
const ADMIN_EMAIL = 'admin@ayushkursela.com'
const ADMIN_PASSWORD = 'Admin@123'

function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function submit(event) {
    event.preventDefault()
    setError('')
    if (!email || !password) return setError('Email aur password dono enter karein.')
    setLoading(true)
    window.setTimeout(() => {
      setLoading(false)
      if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) onLogin()
      else setError('Email ya password galat hai.')
    }, 550)
  }

  return <main className="admin-login">
    <section className="login-brand-panel">
      <img src="/ayush/logo-navbar-clean.png" alt="Ayush Kursela" />
      <div><span>ADMIN CONSOLE</span><h1>Tradition ko<br/>smartly manage karein.</h1><p>Orders, inventory aur customers — sab kuch ek secure workspace mein.</p></div>
      <small>© 2026 Ayush Kursela. Secure administration.</small>
    </section>
    <section className="login-form-panel">
      <div className="login-card">
        <div className="login-mobile-logo"><img src="/ayush/logo-navbar-clean.png" alt="Ayush Kursela" /></div>
        <span className="secure-label">● SECURE ADMIN ACCESS</span>
        <h2>Welcome back</h2><p>Admin panel continue karne ke liye sign in karein.</p>
        <form onSubmit={submit}>
          <label>Email address<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@ayushkursela.com" autoComplete="username" /></label>
          <label>Password<div className="password-field"><input type={showPassword?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password" autoComplete="current-password"/><button type="button" onClick={()=>setShowPassword(!showPassword)}>{showPassword?'Hide':'Show'}</button></div></label>
          <div className="login-meta"><label><input type="checkbox" defaultChecked/> Remember me</label><button type="button">Forgot password?</button></div>
          {error && <div className="login-error">{error}</div>}
          <button className="login-submit" disabled={loading}>{loading?'Verifying…':'Sign in to Admin Panel'}<span>→</span></button>
        </form>
        <div className="demo-credentials"><b>Demo credentials</b><span>{ADMIN_EMAIL}</span><span>{ADMIN_PASSWORD}</span></div>
        <a href="/">← User panel par wapas jayein</a>
      </div>
    </section>
  </main>
}

export default function AdminPanel() {
  const [authenticated, setAuthenticated] = useState(() => window.sessionStorage.getItem(SESSION_KEY) === 'active')
  function login(){ window.sessionStorage.setItem(SESSION_KEY,'active'); setAuthenticated(true) }
  function logout(){ window.sessionStorage.removeItem(SESSION_KEY); setAuthenticated(false) }
  if (!authenticated) return <LoginScreen onLogin={login}/>
  return <div className="protected-admin"><button className="secure-logout" onClick={logout}>Logout</button><AdminDashboard/></div>
}
