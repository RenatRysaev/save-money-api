import { pick } from 'lodash'
import asyncHandler from 'express-async-handler'
import { param } from 'express-validator/check'

import ExpenseCategory from 'models/expense_category/index'

/**
 * @api {delete} /expense_categories/:id Remove expense category
 * @apiName Remove expense category
 * @apiGroup Expense categories
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} id Expense category id
 *
 * @apiSuccess {String} id Expense category id
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    id: '123',
 *  }
 */

export const validationForRemove = [
  param('id').exists({ checkFalsy: true, checkNull: true }),
]

const remove = asyncHandler(async (req, res) => {
  const { id: expenseCategoryId } = req.params
  const { id: user_id } = req.user

  const expenseCategory = await ExpenseCategory.findById(expenseCategoryId)

  if (!expenseCategory) {
    return res.status(400).json({ error: 'No such category' })
  }

  if (expenseCategory.user_id !== user_id) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  const deletedExpenseCategory = await ExpenseCategory.findByIdAndRemove(
    expenseCategoryId,
  )

  return res.status(200).json(pick(deletedExpenseCategory, ['id']))
})

export default remove
