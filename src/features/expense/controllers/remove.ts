import { pick, toString } from 'lodash'
import asyncHandler from 'express-async-handler'
import { param } from 'express-validator/check'
import { Request, Response } from 'express'

import Expense from '../model'

/**
 * @api {delete} /expenses/:id Remove expense
 * @apiName Remove expense
 * @apiGroup Expenses
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} id Expense id
 *
 * @apiSuccess {String} id Expense id
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    id: 'asd89asmgghd',
 *  }
 */

export const validationForRemove = [param('id').exists({ checkFalsy: true })]

const remove = asyncHandler(async (req: Request, res: Response) => {
  const { id: expense_id } = req.params
  const { id: user_id } = req.user

  const expense = await Expense.findById(expense_id)

  if (!expense) {
    return res.status(400).json({ error: 'No such category' })
  }

  if (toString(expense.user_id) !== toString(user_id)) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  const deletedExpense = await Expense.findByIdAndRemove(expense_id)

  return res.status(200).json(pick(deletedExpense, ['id']))
})

export default remove
