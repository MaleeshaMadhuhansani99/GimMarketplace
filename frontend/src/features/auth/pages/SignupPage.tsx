import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { signupThunk } from '../authSlice'
import { validateSignupForm, type SignupFormErrors } from '../utils/validateAuthForm'
import TextField from '../../../components/form/TextField'
import ErrorState from '../../../components/error/ErrorState'

export default function SignupPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { loading, error } = useAppSelector((state) => state.auth)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState<SignupFormErrors>({})

  const clearFieldError = (field: keyof SignupFormErrors) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const handleNameChange = (value: string) => {
    setName(value)
    clearFieldError('name')
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

    const errors = validateSignupForm({ name, email, password })

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    setFieldErrors({})

    try {
      await dispatch(
        signupThunk({ name: name.trim(), email: email.trim(), password }),
      ).unwrap()

      navigate('/login', {
        state: {
          message: 'Account created successfully. Please log in.',
          prefillEmail: email.trim(),
        },
      })
    } catch {
      console.error('Failed to sign up:', error)
    }
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="mb-8 text-2xl font-bold">Create an account</h1>

      {error && (
        <div className="mb-4">
          <ErrorState message={error} />
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <TextField
            id="name"
            label="Name"
            value={name}
            onChange={handleNameChange}
            placeholder="Your name"
            error={fieldErrors.name}
          />
        </div>

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
          {loading ? 'Creating account...' : 'Sign up'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-black hover:underline">
          Log in
        </Link>
      </p>
    </div>
  )
}