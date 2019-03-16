import { Router } from 'express'
import { withProtect, withValidationErrorsHandler } from 'utils/route'

import controller from 'controllers/cost_categories'

const router = new Router()

router.get('/v1/cost_categories', withProtect(), controller.list)

router.post(
  '/v1/cost_categories/create',
  [
    ...withProtect(),
    ...controller.validationForCreate,
    ...withValidationErrorsHandler(),
  ],
  controller.create,
)

router.patch(
  '/v1/cost_categories/:id',
  [
    ...withProtect(),
    ...controller.validationForUpdate,
    ...withValidationErrorsHandler(),
  ],
  controller.update,
)

router.delete(
  '/v1/cost_categories/:id',
  [
    ...withProtect(),
    ...controller.validationForRemove,
    ...withValidationErrorsHandler(),
  ],
  controller.remove,
)

export default router
