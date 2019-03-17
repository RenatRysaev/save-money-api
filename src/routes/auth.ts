import { Router } from 'express'
import { withProtect, withValidationErrorsHandler } from 'utils/route'

import controller from 'controllers/auth'

const router = Router()

router.post(
  '/v1/reg',
  [
    ...withProtect(),
    ...controller.validationForReg,
    ...withValidationErrorsHandler(),
  ],
  controller.reg,
)

router.post(
  '/v1/login',
  [...controller.validationForLogin, ...withValidationErrorsHandler()],
  controller.login,
)

router.post('/v1/check_login', withProtect(), controller.checkLogin)

export default router
