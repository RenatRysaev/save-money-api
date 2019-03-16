import { Router } from 'express'
import { withProtect, withValidationErrorsHandler } from 'utils/route'

import controller from 'controllers/planned_expenses'

const router = new Router()

router.get('/v1/planned_expenses', withProtect(), controller.list)

router.post(
  '/v1/planned_expenses/create',
  [
    ...withProtect(),
    ...controller.validationForCreate,
    ...withValidationErrorsHandler(),
  ],
  controller.create,
)

router.patch(
  '/v1/planned_expenses/:id',
  [
    ...withProtect(),
    ...controller.validationForUpdate,
    ...withValidationErrorsHandler(),
  ],
  controller.update,
)

router.delete(
  '/v1/planned_expenses/:id',
  [
    ...withProtect(),
    ...controller.validationForRemove,
    ...withValidationErrorsHandler(),
  ],
  controller.remove,
)

export default router
