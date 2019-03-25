import { Router } from 'express'
import { withProtect, withValidationErrorsHandler } from 'utils/route'

import controller from './controllers'

const router = Router()

router.post(
  '/v1/income/create',
  [
    ...withProtect(),
    ...controller.validationForCreate,
    ...withValidationErrorsHandler(),
  ],
  controller.create,
)

router.get('/v1/income', withProtect(), controller.get)

router.patch(
  '/v1/income/:id',
  [
    ...withProtect(),
    ...controller.validationForUpdate,
    ...withValidationErrorsHandler(),
  ],
  controller.update,
)

router.delete(
  '/v1/income/:id',
  [
    ...withProtect(),
    ...controller.validationForRemove,
    ...withValidationErrorsHandler(),
  ],
  controller.remove,
)

export default router
