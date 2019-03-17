import pick from 'lodash/pick'
import asyncHandler from 'express-async-handler'
import { param } from 'express-validator/check'

import FactExpense from 'models/fact_expense/index'

/**
 * @api {delete} /fact_expenses/:id Remove fact expense
 * @apiName Remove fact expense
 * @apiGroup Fact expenses
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} id Fact expenses id
 *
 * @apiSuccess {String} id Fact expenses id
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
  const { id: factExpenseId } = req.params
  const { id: user_id } = req.user

  const factExpense = await FactExpense.findById(factExpenseId)

  if (!factExpense) {
    return res.status(400).json({ error: 'No such category' })
  }

  if (factExpense.user_id !== user_id) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  const deletedFactExpense = await FactExpense.findByIdAndRemove(factExpenseId)

  return res.status(200).json(pick(deletedFactExpense, ['id']))
})

export default remove
