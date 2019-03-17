import asyncHandler from 'express-async-handler'
import { body } from 'express-validator/check'
import { pick } from 'lodash'

import ExpenseCategory from 'models/expense_category/index'

/**
 * @api {post} /expense_categories/create Create expense category
 * @apiName Create expense category
 * @apiGroup Expense categories
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} name Expense category name
 *
 * @apiSuccess {String} name Fact expenses name
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    id: '124e13e432',
 *    name: 'Food',
 *  }
 */

export const validationForCreate = [
  body('name').exists({ checkFalsy: true, checkNull: true }),
]

const create = asyncHandler(async (req, res) => {
  const { name } = req.body
  const { id: user_id } = req.user

  const expenseCategory = new ExpenseCategory({ name, user_id })

  await expenseCategory.save()

  return res.status(201).json(pick(expenseCategory, ['name', 'id']))
})

export default create
