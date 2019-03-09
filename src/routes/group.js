import { Router } from 'express'
import passport from 'passport'

import controller from 'controllers/group'

const router = new Router()

router.post(
  '/v1/group/create',
  passport.authenticate('jwt', { session: false }),
  controller.create,
)

router.patch(
  '/v1/group/:id',
  passport.authenticate('jwt', { session: false }),
  controller.update,
)

router.delete(
  '/v1/group/:id',
  passport.authenticate('jwt', { session: false }),
  controller.remove,
)

router.post(
  '/v1/group/add_user',
  passport.authenticate('jwt', { session: false }),
  controller.addUser,
)

router.delete(
  '/v1/group/user/:id',
  passport.authenticate('jwt', { session: false }),
  controller.removeUser,
)

export default router
