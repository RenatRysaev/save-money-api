import asyncHandler from 'express-async-handler'
import { param } from 'express-validator/check'
import { Request, Response } from 'express'
import { toString } from 'lodash'

import Expense from '../model'

/**
 * @api {patch} /expenses/:id Update expense
 * @apiName Update expense
 * @apiGroup Expenses
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} id Expense id
 * @apiParam {Number} [sum] Expense sum
 * @apiParam {String} [name] Expense name
 * @apiParam {String} [date] Expense date
 * @apiParam {String} [currency] Expense currency
 * @apiParam {String="planned","actual"} [type] Expense type
 * @apiParam {String="permanent","one_time"} [kind] Expense kind

 * @apiSuccess {String} id Expense id
 * @apiSuccess {String} name Expense name
 * @apiSuccess {Number} sum Expense sum
 * @apiSuccess {String} date Expense date
 * @apiSuccess {String} currency Expense currency
 * @apiSuccess {String} type Expense type
 * @apiSuccess {String} kind Expense kind
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    id: '234',
 *    name: 'Food',
 *    sum: 1000,
 *    date: '2019.20.05',
 *    currency: 'EUR',
 *    kind: 'permanent',
 *    type: 'actual',
 *  }
 */

export const validationForUpdate = [param('id').exists({ checkFalsy: true })]

const update = asyncHandler(async (req: Request, res: Response) => {
  const { id: expense_id } = req.params
  const { name, sum, date, currency, kind, type } = req.body
  const { id: user_id } = req.user

  const expense = await Expense.findById(expense_id)

  if (toString(expense!.user_id) !== toString(user_id)) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  const updatedExpense = await Expense.findByIdAndUpdate(
    expense_id,
    {
      name: name || expense!.name,
      sum: sum || expense!.sum,
      date: date || expense!.date,
      currency: currency || expense!.currency,
      kind: kind || expense!.kind,
      type: type || expense!.type,
    },
    { new: true },
  )

  return res.status(200).json(updatedExpense)
})

export default update
