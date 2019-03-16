import pick from 'lodash/pick'
import asyncHandler from 'express-async-handler'
import { param } from 'express-validator/check'

import PlannedExpense from 'models/planned_expense'

/**
 * @api {patch} /planned_expenses/:id Update planned expense
 * @apiName Update planned expense
 * @apiGroup Planned expenses
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} id Planned expense id
 * @apiParam {Number} [sum] Planned expense sum
 * @apiParam {String} [name] Planned expense name
 * @apiParam {String} [currency] Planned expense currency
 * @apiParam {String} [category_id] Planned expense category id
 *
 * @apiSuccess {String} name Planned expense name
 * @apiSuccess {String} id Planned expense id
 * @apiSuccess {String} category_id Planned expense category id
 * @apiSuccess {Number} sum Planned expense sum
 * @apiSuccess {String} currency Planned expense currency
 * @apiSuccess {String} [group_id] Group id
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    name: 'Food',
 *    id: '234',
 *    sum: 1000,
 *    currency: 'eur',
 *    group_id: '123',
 *    category_id: 'as2342df',
 *  }
 */

export const validationForUpdate = [
  param('id').exists({ checkFalsy: true, checkNull: true }),
]

const update = asyncHandler(async (req, res) => {
  const { id: plannedExpenseId } = req.params
  const { name, sum, currency, category_id } = req.body
  const { id: user_id } = req.user

  const plannedExpense = await PlannedExpense.findById(plannedExpenseId)

  if (plannedExpense.user_id !== user_id) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  const updatedPlannedExpense = await PlannedExpense.findByIdAndUpdate(
    plannedExpenseId,
    {
      name: name || plannedExpense.name,
      sum: sum || plannedExpense.sum,
      currency: currency || plannedExpense.currency,
      category_id: category_id || plannedExpense.category_id,
    },
    { new: true },
  )

  return res
    .status(200)
    .json(
      pick(updatedPlannedExpense, [
        'id',
        'name',
        'sum',
        'currency',
        'group_id',
        'category_id',
      ]),
    )
})

export default update
