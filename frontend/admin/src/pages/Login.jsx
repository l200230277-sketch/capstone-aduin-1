import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo } from '../components/Logo.jsx'
import { useSession } from '../context/SessionContext.jsx'
import '../App.css'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useSession()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // hapus session lama
  useEffect(() => {
    localStorage.removeItem('currentUser')
  }, [])

  function handleSubmit(e) {
    e.preventDefault()

    // validasi kosong
    if (!username && !password) {
      setError('Masukkan username dan password')
      return
    }

    if (!username) {
      setError('Masukkan username')
      return
    }

    if (!password) {
      setError('Masukkan password')
      return
    }

    // akun admin tetap
    const adminData = {
      username: 'admin',
      email: 'admin@gmail.com',
      password: '1234',
    }

    // username salah
    if (username !== adminData.username) {
      setError('Username salah')
      return
    }

    // password salah
    if (password !== adminData.password) {
      setError('Password salah')
      return
    }

    // login berhasil
    setError('')

    login({
      username: adminData.username,
      email: adminData.email,
    })

    localStorage.setItem(
      'currentUser',
      JSON.stringify(adminData)
    )

    navigate('/dashboard', {
      replace: true,
    })
  }

  return (
    <div className="login-page">
      <header className="login-page__header">
        <Logo size="medium" />
      </header>

      <main className="login-page__main">
        <h1 className="login-page__title">
          Login Admin
        </h1>

        <form
          className="login-page__form"
          onSubmit={handleSubmit}
          noValidate
        >
          <label className="aduin-field">
            <span className="visually-hidden">
              Username
            </span>

            <input
              className="aduin-input"
              name="username"
              autoComplete="username"
              placeholder="masukkan username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />
          </label>

          <label className="aduin-field">
            <span className="visually-hidden">
              Password
            </span>

            <input
              className="aduin-input"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="masukkan password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </label>

          {/* ERROR */}
          {error && (
            <p className="login-page__error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="aduin-btn aduin-btn--primary login-page__submit"
          >
            Login
          </button>
        </form>
      </main>
    </div>
  )
}