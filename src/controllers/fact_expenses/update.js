import pick from 'lodash/pick'
import asyncHandler from 'express-async-handler'
import { param } from 'express-validator/check'

import FactExpense from 'models/fact_expense'

/**
 * @api {patch} /fact_expenses/:id Update fact expense
 * @apiName Update fact expense
 * @apiGroup Fact expenses
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} id Fact expense id
 * @apiParam {Number} [sum] Fact expense sum
 * @apiParam {String} [name] Fact expense name
 * @apiParam {String} [currency] Fact expense currency
 *
 * @apiSuccess {String} name Fact expense name
 * @apiSuccess {String} id Fact expense id
 * @apiSuccess {Number} sum Fact expense sum
 * @apiSuccess {String} currency Fact expense currency
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    name: 'Food',
 *    id: '234',
 *    sum: 1000,
 *    currency: 'eur',
 *  }
 */

export const validationForUpdate = [
  param('id').exists({ checkFalsy: true, checkNull: true }),
]

const update = asyncHandler(async (req, res) => {
  const { id: factExpenseId } = req.params
  const { name, sum, currency } = req.body
  const { id: user_id } = req.user

  const factExpense = await FactExpense.findById(factExpenseId)

  if (factExpense.user_id !== user_id) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  const updatedFactExpense = await FactExpense.findByIdAndUpdate(
    factExpenseId,
    {
      name: name || factExpense.name,
      sum: sum || factExpense.sum,
      currency: currency || factExpense.currency,
    },
    { new: true },
  )

  return res
    .status(200)
    .json(pick(updatedFactExpense, ['id', 'name', 'sum', 'currency']))
})

export default update
