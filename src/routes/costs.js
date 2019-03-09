import { Router } from 'express'
import passport from 'passport'

import costsController from 'controllers/costs'

const router = new Router()

router.get(
  '/v1/costs',
  passport.authenticate('jwt', { session: false }),
  costsController.list,
)

router.post(
  '/v1/costs/create',
  passport.authenticate('jwt', { session: false }),
  costsController.create,
)

router.patch(
  '/v1/costs/:id',
  passport.authenticate('jwt', { session: false }),
  costsController.update,
)

router.delete(
  '/v1/costs/:id',
  passport.authenticate('jwt', { session: false }),
  costsController.remove,
)

export default router
