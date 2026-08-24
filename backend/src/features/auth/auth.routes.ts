import { Router } from 'express'

import { login, register } from './auth.controller'
import { authenticate } from '../../middleware/auth'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/me', authenticate, (req, res) => {
  return res.json({
    message: 'Authenticated successfully',
    userId: req.user?.userId,
  })
})

export default router