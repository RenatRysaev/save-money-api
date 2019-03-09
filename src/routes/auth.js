import { Router } from 'express'
import passport from 'passport'

import controller from 'controllers/auth'

const router = new Router()

router.post('/v1/reg', controller.reg)

router.post('/v1/login', controller.login)

router.post(
  '/v1/check_login',
  passport.authenticate('jwt', { session: false }),
  controller.checkLogin,
)

export default router
