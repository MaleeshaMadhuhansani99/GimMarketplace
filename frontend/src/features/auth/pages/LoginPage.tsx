import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { loginThunk } from '../authSlice'
import { validateLoginForm, type LoginFormErrors } from '../utils/validateAuthForm'
import TextField from '../../../components/form/TextField'
import ErrorState from '../../../components/error/ErrorState'

interface LocationState {
  message?: string
  prefillEmail?: string
  from?: { pathname: string }
}

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { loading, error } = useAppSelector((state) => state.auth)

  const state = location.state as LocationState | null

  const [email, setEmail] = useState(state?.prefillEmail ?? '')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState<LoginFormErrors>({})

  const clearFieldError = (field: keyof LoginFormErrors) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const handleEmailChange = (value: string) => {
    setEmail(value)
    clearFieldError('email')
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    clearFieldError('password')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const errors = validateLoginForm({ email, password })

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    setFieldErrors({})

    try {
      await dispatch(loginThunk({ email: email.trim(), password })).unwrap()
      navigate(state?.from?.pathname ?? '/')
    } catch {
      console.error('Failed to log in:', error)
    }
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="mb-8 text-2xl font-bold">Log in</h1>

      {state?.message && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-2.5 text-sm text-green-700">
          {state.message}
        </div>
      )}

      {error && (
        <div className="mb-4">
          <ErrorState message={error} />
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <TextField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="you@example.com"
            error={fieldErrors.email}
          />
        </div>

        <div>
          <TextField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="••••••••"
            error={fieldErrors.password}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Don't have an account?{' '}
        <Link to="/signup" className="font-medium text-black hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  )
}