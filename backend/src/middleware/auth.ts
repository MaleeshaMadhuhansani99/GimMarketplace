import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import {JWT_SECRET} from '../config/env'

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
    const token = req.cookies.access_token

    if (!token) {
      return sendError(
        res,
        401,
        'Authentication required',
      )
    }

    const decoded = jwt.verify(
      token,
      JWT_SECRET,
    ) as JwtPayload

    req.user = {
      userId: decoded.userId,
    }

    next()
  } catch (error) {
    console.error(
      'Authentication error:',
      error,
    )

    return sendError(
      res,
      401,
      'Invalid or expired session',
    )
  }
}