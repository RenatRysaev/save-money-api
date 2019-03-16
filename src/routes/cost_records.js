import { Router } from 'express'
import { withProtect, withValidationErrorsHandler } from 'utils/route'

import controller from 'controllers/cost_categories'

const router = new Router()

router.get('/v1/cost_records', withProtect(), controller.list)

router.post(
  '/v1/cost_records/create',
  [
    ...withProtect(),
    ...controller.validationForCreate,
    ...withValidationErrorsHandler(),
  ],
  controller.create,
)

router.patch(
  '/v1/cost_records/:id',
  [
    ...withProtect(),
    ...controller.validationForUpdate,
    ...withValidationErrorsHandler(),
  ],
  controller.update,
)

router.delete(
  '/v1/cost_records/:id',
  [
    ...withProtect(),
    ...controller.validationForRemove,
    ...withValidationErrorsHandler(),
  ],
  controller.remove,
)

export default router
