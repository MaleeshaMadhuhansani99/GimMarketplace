import { Request, Response, NextFunction } from 'express'

export function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const start = Date.now()

  res.on('finish', () => {
    const duration = Date.now() - start
    const { method, originalUrl } = req
    const { statusCode } = res

    const logLine = `${method} ${originalUrl} ${statusCode} - ${duration}ms`

    if (statusCode >= 500) {
      console.error(logLine)
    } else if (statusCode >= 400) {
      console.warn(logLine)
    } else {
      console.log(logLine)
    }
  })

  next()
}