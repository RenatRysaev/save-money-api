import { Router } from 'express'
import { withProtect, withValidationErrorsHandler } from 'utils/route'

import controller from 'controllers/planned_expenses'

const router = Router()

router.get('/v1/expense_categories', withProtect(), controller.list)

router.post(
  '/v1/expense_categories/create',
  [
    ...withProtect(),
    ...controller.validationForCreate,
    ...withValidationErrorsHandler(),
  ],
  controller.create,
)

router.patch(
  '/v1/expense_categories/:id',
  [
    ...withProtect(),
    ...controller.validationForUpdate,
    ...withValidationErrorsHandler(),
  ],
  controller.update,
)

router.delete(
  '/v1/expense_categories/:id',
  [
    ...withProtect(),
    ...controller.validationForRemove,
    ...withValidationErrorsHandler(),
  ],
  controller.remove,
)

export default router
