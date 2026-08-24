import { lazy, Suspense } from 'react'

const AdminPanel = lazy(() => import('./admin-panel/AdminPanel.jsx'))
const UserPanel = lazy(() => import('./user-panel/UserPanel.jsx'))

export default function FrontendApp() {
  const isAdminRoute = window.location.pathname.toLowerCase().startsWith('/admin')
  return <Suspense fallback={<div style={{minHeight:'100vh',display:'grid',placeItems:'center',background:'#fffdf7',color:'#246b2a',fontWeight:700}}>Ayush Kursela loading…</div>}>
    {isAdminRoute ? <AdminPanel /> : <UserPanel />}
  </Suspense>
}
