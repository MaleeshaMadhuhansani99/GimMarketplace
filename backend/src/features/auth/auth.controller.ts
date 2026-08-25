import {Request, Response} from 'express'

import {AuthService} from './auth.service'
import {sendError, sendSuccess} from '../../utils/apiResponse'

const authService = new AuthService()

export const register = async (req: Request, res: Response) => {
  try {
    const {name, email, password} = req.body

    if (!name || !email || !password) {
      return sendError(res, 400, 'Name, email and password are required')
    }

    if (password.length < 6) {
      return sendError(res, 400, 'Password must be at least 6 characters long')
    }

    const user = await authService.register({
      name,
      email,
      password,
    })

    return sendSuccess(res, 201, {data: user}, 'User registered successfully')
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === 'Email already registered'
    ) {
      return sendError(res, 409, error.message)
    }

    console.error('Error registering user:', error)

    return sendError(res, 500, 'Failed to register user')
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const {email, password} = req.body

    if (!email || !password) {
      return sendError(res, 400, 'Email and password are required')
    }

    const result = await authService.login({
      email,
      password,
    })

    res.cookie('access_token', result.token, {
      httpOnly: true,

      secure: process.env.NODE_ENV === 'production',

      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',

      maxAge: 24 * 60 * 60 * 1000,

      path: '/',
    })

    return sendSuccess(
      res,
      200,
      {
        data: {
          user: result.user,
        },
      },
      'Login successful',
    )
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === 'Invalid email or password'
    ) {
      return sendError(res, 401, error.message)
    }

    console.error('Error logging in:', error)

    return sendError(res, 500, 'Failed to login')
  }
}

export const logout = (req: Request, res: Response) => {
  res.clearCookie('access_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',

    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',

    path: '/',
  })

  return sendSuccess(res, 200, undefined, 'Logout successful')
}

export const getMe = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return sendError(res, 401, 'Authentication required')
    }

    const user = await authService.getUserById(req.user.userId)

    if (!user) {
      return sendError(res, 404, 'User not found')
    }

    return sendSuccess(res, 200, {data: {user}})
  } catch (error) {
    console.error('Error fetching current user:', error)
    return sendError(res, 500, 'Failed to fetch user')
  }
}
