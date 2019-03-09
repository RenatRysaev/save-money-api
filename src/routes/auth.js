import { Router } from 'express'
import passport from 'passport'

import authController from 'controllers/auth'

const router = new Router()

router.post('/v1/reg', authController.reg)

router.post('/v1/login', authController.login)

router.post(
  '/v1/check_login',
  passport.authenticate('jwt', { session: false }),
  authController.checkLogin,
)

export default router
