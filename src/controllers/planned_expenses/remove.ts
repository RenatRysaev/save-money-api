import { pick } from 'lodash'
import asyncHandler from 'express-async-handler'
import { param } from 'express-validator/check'

import PlannedExpense from 'models/planned_expense'

/**
 * @api {delete} /planned_expenses/:id Remove planned expense
 * @apiName Remove planned expense
 * @apiGroup Planned expenses
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} id Planned expense id
 *
 * @apiSuccess {String} id Planned expense id
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    id: '456',
 *  }
 */

export const validationForRemove = [
  param('id').exists({ checkFalsy: true, checkNull: true }),
]

const remove = asyncHandler(async (req, res) => {
  const { id: plannedExpenseId } = req.params
  const { id: user_id } = req.user

  const plannedExpense = await PlannedExpense.findById(plannedExpenseId)

  if (!plannedExpense) {
    return res.status(400).json({ error: 'No such item' })
  }

  if (plannedExpense.user_id !== user_id) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  const deletedPlannedExpense = await PlannedExpense.findByIdAndRemove(
    plannedExpenseId,
  )

  return res.status(200).json(pick(deletedPlannedExpense, ['id']))
})

export default remove
