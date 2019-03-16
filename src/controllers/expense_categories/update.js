import pick from 'lodash/pick'
import asyncHandler from 'express-async-handler'
import { param, body } from 'express-validator/check'

import ExpenseCategory from 'models/expense_category'

/**
 * @api {patch} /expense_categories/:id Update expense category
 * @apiName Update expense category
 * @apiGroup Expense categories
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} id Expense category id
 * @apiParam {String} name Expense category name
 *
 * @apiSuccess {String} id Expense category id
 * @apiSuccess {String} name Expense category name
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    name: 'Food',
 *    id: '5acas6465',
 *  }
 */

export const validationForUpdate = [
  param('id').exists({ checkFalsy: true, checkNull: true }),
  body('name').exists({ checkFalsy: true, checkNull: true }),
]

const update = asyncHandler(async (req, res) => {
  const { id: expenseCategoryId } = req.params
  const { name } = req.body
  const { id: user_id } = req.user

  const expenseCategory = await ExpenseCategory.findById(expenseCategoryId)

  if (expenseCategory.user_id !== user_id) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  const updatedExpenseCategory = await ExpenseCategory.findByIdAndRemove(
    expenseCategoryId,
    {
      name: name || income.name,
    },
    { new: true },
  )

  return res.status(200).json(pick(updatedExpenseCategory, ['id', 'name']))
})

export default update
