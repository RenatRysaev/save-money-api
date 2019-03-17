import { Router } from 'express'
import { withProtect, withValidationErrorsHandler } from 'utils/route'

import controller from 'controllers/group'

const router = Router()

router.post(
  '/v1/group/create',
  [
    ...withProtect(),
    ...controller.validationForCreate,
    ...withValidationErrorsHandler(),
  ],
  controller.create,
)

router.patch(
  '/v1/group/:id',
  [
    ...withProtect(),
    ...controller.validationForUpdate,
    ...withValidationErrorsHandler(),
  ],
  controller.update,
)

router.delete(
  '/v1/group/:id',
  [
    ...withProtect(),
    ...controller.validationForRemove,
    ...withValidationErrorsHandler(),
  ],
  controller.remove,
)

router.post(
  '/v1/group/add_user',
  [
    ...withProtect(),
    ...controller.validationForAddUser,
    ...withValidationErrorsHandler(),
  ],
  controller.addUser,
)

router.delete(
  '/v1/group/user/:id',
  [
    ...withProtect(),
    ...controller.validationForRemoveUser,
    ...withValidationErrorsHandler(),
  ],
  controller.removeUser,
)

export default router
