import { Router } from 'express'

import { getMe, login, logout, register } from './auth.controller'
import { authenticate } from '../../middleware/auth'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/me', authenticate, getMe)

export default router