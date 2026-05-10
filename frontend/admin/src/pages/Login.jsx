import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo } from '../components/Logo.jsx'
import { useSession } from '../context/SessionContext.jsx'
import '../App.css'
import logo from '../assets/logo.png'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useSession()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    localStorage.removeItem('currentUser')
  }, [])

  function handleSubmit(e) {
    e.preventDefault()

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

    const adminData = {
      username: 'admin',
      email: 'admin@gmail.com',
      password: '1234',
    }

    if (username !== adminData.username) {
      setError('Username salah')
      return
    }

    if (password !== adminData.password) {
      setError('Password salah')
      return
    }

    setError('')

    login({
      username: adminData.username,
      email: adminData.email,
    })

    localStorage.setItem(
      'currentUser',
      JSON.stringify(adminData)
    )

    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="login-page">
      <header className="login-page__header">
        <div className="login-page__brand">
          <img
            src={logo}
            alt="ADUIN Logo"
            className="login-page__logo-img"
          />
          <Logo size="large" />
        </div>
      </header>

      <main className="login-page__main">


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