import { Router } from 'express'

import { login, logout, register } from './auth.controller'
import { authenticate } from '../../middleware/auth'
import { sendSuccess } from '../../utils/apiResponse'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/me', authenticate, (req, res) => {
  return sendSuccess(res, 200, {
    data: {
      user: req.user,
    },
  })
})

export default router