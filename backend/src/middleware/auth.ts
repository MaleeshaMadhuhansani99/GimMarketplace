import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { sendError } from '../utils/apiResponse'

interface JwtPayload {
  userId: number
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return sendError(res, 401, 'Authentication required')
    }

    const [type, token] = authHeader.split(' ')

    if (type !== 'Bearer' || !token) {
      return sendError(res, 401, 'Invalid authorization header')
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as JwtPayload

    req.user = {
      userId: decoded.userId,
    }

    next()
  } catch (error) {
    console.error('Authentication error:', error)

    return sendError(res, 401, 'Invalid or expired token')
  }
}