import { useMemo, useState } from 'react'
import BottomNav from './components/BottomNav'
import HomePage from './pages/HomePage'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import ReportPage from './pages/ReportPage'
import SignUpPage from './pages/SignUpPage'
import { INITIAL_USER } from './constants/mockData'
import './App.css'

function App() {
  const [screen, setScreen] = useState('landing')

  /* USER LOGIN */
  const [user, setUser] = useState({
    ...INITIAL_USER,
    name: '',
    username: '',
    password: '',
    email: '',
    address: '',
    phone: '',
  })

  /* DATA AKUN TERDAFTAR */
  const [registeredUsers, setRegisteredUsers] = useState([])

  /* DATA LAPORAN */
  const [reports, setReports] = useState([])

  /* GREETING */
  const greeting = useMemo(() => {
    if (!user.username) return 'Halo'
    return `Halo, ${user.username}`
  }, [user.username])

  /* LOGIN */
  const handleLogin = ({ username, password }) => {
    const foundUser = registeredUsers.find(
      (item) =>
        item.username === username.trim() &&
        item.password === password
    )

    if (!foundUser) {
      alert('Akun tidak ditemukan. Silakan sign up terlebih dahulu.')
      return
    }

    setUser({
      ...INITIAL_USER,
      name: foundUser.fullName,
      username: foundUser.username,
      password: foundUser.password,
      email: foundUser.email,
      address: foundUser.address || '',
      phone: foundUser.phone || '',
      photo: foundUser.photo || '',
      role: 'Pelapor',
    })

    alert(`Selamat datang, ${foundUser.username}!`)
    setScreen('home')
  }

  /* SIGN UP */
  const handleSignUp = ({
    fullName,
    username,
    email,
    password,
  }) => {
    const cleanUsername = username.trim()

    const isUsernameExist = registeredUsers.some(
      (item) => item.username === cleanUsername
    )

    if (isUsernameExist) {
      alert('Username sudah digunakan. Coba username lain.')
      return
    }

    const cleanEmail = email.includes('@gmail.com')
      ? email.trim()
      : `${email.trim()}@gmail.com`

    const newUser = {
      fullName: fullName?.trim() || cleanUsername,
      username: cleanUsername,
      email: cleanEmail,
      password,
      address: '',
      phone: '',
      photo: '',
    }

    setRegisteredUsers((prev) => [...prev, newUser])

    alert('Pendaftaran berhasil! Silakan login.')
    setScreen('login')
  }

  /* BUAT LAPORAN */
  const handleSubmitReport = (report) => {
    const newReport = {
      ...report,
      id: Date.now(),
      user: user.username,
      date: new Date().toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),

      /*
        STATUS AWAL:
        Riwayat = Diterima
        Dashboard Diproses = 0
      */
      status: 'Diterima',
    }

    setReports((prev) => [newReport, ...prev])
    setScreen('home')
  }

  /* HAPUS LAPORAN */
  const handleDeleteReport = (id) => {
    const confirmDelete = window.confirm(
      'Hapus laporan ini?'
    )

    if (!confirmDelete) return

    setReports((prev) =>
      prev.filter((item) => item.id !== id)
    )
  }

  /* FOTO PROFIL */
  const handlePhotoChange = (imageUrl) => {
    setUser((prev) => ({
      ...prev,
      photo: imageUrl,
    }))

    setRegisteredUsers((prev) =>
      prev.map((item) =>
        item.username === user.username
          ? {
              ...item,
              photo: imageUrl,
            }
          : item
      )
    )
  }

  /* EDIT PROFIL */
  const handleUpdateProfile = ({ address, phone }) => {
    setUser((prev) => ({
      ...prev,
      address,
      phone,
    }))

    setRegisteredUsers((prev) =>
      prev.map((item) =>
        item.username === user.username
          ? {
              ...item,
              address,
              phone,
            }
          : item
      )
    )

    alert('Profil berhasil diperbarui!')
  }

  /* LOGOUT SIDEBAR */
  const handleLogout = () => {
    setScreen('landing')

    setUser({
      ...INITIAL_USER,
      name: '',
      username: '',
      password: '',
      email: '',
      address: '',
      phone: '',
    })
  }

  /* FILTER LAPORAN USER LOGIN */
  const myReports = reports.filter(
    (item) => item.user === user.username
  )

  /* STATISTIK DASHBOARD
     Diterima tidak dihitung Diproses
     Diproses hanya jika admin ubah ke "Diproses"
  */
  const stats = [
    {
      label: 'Total Laporan',
      value: myReports.length,
    },
    {
      label: 'Diproses',
      value: myReports.filter(
        (item) =>
          (item.status || '').toLowerCase() === 'diproses'
      ).length,
    },
    {
      label: 'Selesai',
      value: myReports.filter(
        (item) =>
          (item.status || '').toLowerCase() === 'selesai'
      ).length,
    },
    {
      label: 'Ditolak',
      value: myReports.filter(
        (item) =>
          (item.status || '').toLowerCase() === 'ditolak'
      ).length,
    },
  ]

  /* ROUTER */
  const screens = {
    landing: (
      <LandingPage
        onLogin={() => setScreen('login')}
        onSignup={() => setScreen('signup')}
      />
    ),

    login: (
      <LoginPage
        onSubmit={handleLogin}
        onSignup={() => setScreen('signup')}
      />
    ),

    signup: (
      <SignUpPage
        onSubmit={handleSignUp}
        onLogin={() => setScreen('login')}
      />
    ),

    home: (
      <HomePage
        greeting={greeting}
        stats={stats}
        reports={myReports}
        onDeleteReport={handleDeleteReport}
        onCreateReport={() => setScreen('report')}
      />
    ),

    report: (
      <ReportPage
        onSubmit={handleSubmitReport}
        onBack={() => setScreen('home')}
      />
    ),

    profile: (
      <ProfilePage
        user={user}
        onBack={() => setScreen('home')}
        onPhotoChange={handlePhotoChange}
        onUpdateProfile={handleUpdateProfile}
      />
    ),
  }

  const showNav = ['home', 'report', 'profile'].includes(
    screen
  )

  return (
    <div
      className={`public-app${
        showNav ? ' public-app--with-nav' : ''
      }`}
    >
      <main className="public-main">
        {screens[screen]}
      </main>

      {showNav && (
        <BottomNav
          screen={screen}
          onNavigate={setScreen}
          onLogout={handleLogout}
        />
      )}
    </div>
  )
}

export default App