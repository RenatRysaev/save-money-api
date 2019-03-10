import { Router } from 'express'
import { withProtect, withValidationErrorsHandler } from 'utils/route'

import controller from 'controllers/costs'

const router = new Router()

router.get('/v1/costs', withProtect(), controller.list)

router.post(
  '/v1/costs/create',
  [
    ...withProtect(),
    ...controller.validationForCreate,
    ...withValidationErrorsHandler(),
  ],
  controller.create,
)

router.patch(
  '/v1/costs/:id',
  [
    ...withProtect(),
    ...controller.validationForUpdate,
    ...withValidationErrorsHandler(),
  ],
  controller.update,
)

router.delete(
  '/v1/costs/:id',
  [
    ...withProtect(),
    ...controller.validationForRemove,
    ...withValidationErrorsHandler(),
  ],
  controller.remove,
)

export default router
