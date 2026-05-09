import { Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from './components/AdminLayout.jsx'
import { RequireAuth } from './components/RequireAuth.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import ReportDetail from './pages/ReportDetail.jsx'
import Splash from './pages/Splash.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login />} />

      <Route element={<RequireAuth />}>
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/laporan/:id" element={<ReportDetail />} />
          <Route path="/profil" element={<Profile />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
