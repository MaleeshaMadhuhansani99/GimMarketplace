import type { User, SignupPayload, LoginPayload } from './types/auth.types'

const API_URL = import.meta.env.VITE_API_URL

async function parseJson(response: Response) {
  const result = await response.json().catch(() => null)

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || 'Request failed')
  }

  return result
}

export async function signup(payload: SignupPayload): Promise<User> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  })

  const result = await parseJson(response)
  return result.data 
}

export async function login(payload: LoginPayload): Promise<User> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  })

  const result = await parseJson(response)
  return result.data.user 
}

export async function logout(): Promise<void> {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  })

  await parseJson(response)
}

export async function getCurrentUser(): Promise<User> {
  const response = await fetch(`${API_URL}/auth/me`, {
    credentials: 'include',
  })

  const result = await parseJson(response)
  return result.data.user
}