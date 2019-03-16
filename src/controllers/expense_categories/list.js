import asyncHandler from 'express-async-handler'

import ExpenseCategory from 'models/expense_category'

/**
 * @api {get} /expense_categories Get expense categories
 * @apiName Get expense categories
 * @apiGroup Expense categories
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiSuccess {Object[]} expense_categories Expense categories
 *
 * @apiSuccessExample Success-Response:
 *  [{
 *      name: 'Auto',
 *      id: '123',
 *  }]
 */

const list = asyncHandler(async (req, res) => {
  const { id: user_id } = req.user

  const expenseCategories = await ExpenseCategory.find({ user_id }, 'id name')

  return res.status(200).json(expenseCategories)
})

export default list
