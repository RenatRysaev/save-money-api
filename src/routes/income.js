import { Router } from 'express'
import passport from 'passport'

import controller from 'controllers/income'

const router = new Router()

router.get(
  '/v1/income',
  passport.authenticate('jwt', { session: false }),
  controller.list,
)

router.post(
  '/v1/costs/income',
  passport.authenticate('jwt', { session: false }),
  controller.create,
)

router.patch(
  '/v1/income/:id',
  passport.authenticate('jwt', { session: false }),
  controller.update,
)

router.delete(
  '/v1/income/:id',
  passport.authenticate('jwt', { session: false }),
  controller.remove,
)

export default router
