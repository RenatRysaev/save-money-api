import { Router as router } from 'express'
import passport from 'passport'

import reg from './reg'
import login from './login'
import checkLogin from './checkLogin'

const authController = {
  reg,
  login,
  checkLogin,
}

export default authController

const auth = models => {
  const api = router()

  api.post(
    '/check-login',
    passport.authenticate('jwt', { session: false }),
    checkLogin(models),
  )

  api.post('/reg', reg(models))
  api.post('/login', login(models))

  return api
}

// export default auth
