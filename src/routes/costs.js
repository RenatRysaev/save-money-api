import { Router } from 'express'
import passport from 'passport'

import controller from 'controllers/costs'

const router = new Router()

router.get(
  '/v1/costs',
  passport.authenticate('jwt', { session: false }),
  controller.list,
)

router.post(
  '/v1/costs/create',
  passport.authenticate('jwt', { session: false }),
  controller.create,
)

router.patch(
  '/v1/costs/:id',
  passport.authenticate('jwt', { session: false }),
  controller.update,
)

router.delete(
  '/v1/costs/:id',
  passport.authenticate('jwt', { session: false }),
  controller.remove,
)

export default router
