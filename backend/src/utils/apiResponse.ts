import { Response } from 'express'

export function sendSuccess<T extends object = object>(
  res: Response,
  status: number,
  payload?: T,
  message?: string,
) {
  return res.status(status).json({
    success: true,
    ...(payload ?? {}),
    ...(message ? { message } : {}),
  })
}

export function sendError(res: Response, status: number, message: string) {
  return res.status(status).json({
    success: false,
    message,
  })
}