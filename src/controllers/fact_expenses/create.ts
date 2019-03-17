import asyncHandler from 'express-async-handler'
import { body } from 'express-validator/check'
import pick from 'lodash/pick'

import FactExpense from 'models/fact_expense'
import ExpenseCategory from 'models/expense_category'
import PlannedExpense from 'models/planned_expense'

/**
 * @api {post} /fact_expenses/create Create fact expense
 * @apiName Create fact expense
 * @apiGroup Fact expenses
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} name Fact expenses name
 * @apiParam {Number} sum Fact expenses sum
 * @apiParam {String} category_id Fact expense category id
 * @apiParam {String} date Fact expenses date
 *
 * @apiSuccess {String} name Fact expenses name
 * @apiSuccess {Number} sum Fact expenses sum
 * @apiSuccess {String} id Fact expenses id
 * @apiSuccess {String} category_id Fact expense category id
 * @apiSuccess {String} date Fact expenses date
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    name: 'Coca-cola',
 *    id: '123',
 *    category_id: 'as2342df',
 *    sum: 1000,
 *    date: '20.05.2005',
 *    description: 'Food',
 *    group_id: '268',
 *    currency: 'eur',
 *  }
 */

export const validationForCreate = [
  body('name').exists({ checkFalsy: true, checkNull: true }),
  body('sum').exists({ checkFalsy: true, checkNull: true }),
  body('date').exists({ checkFalsy: true, checkNull: true }),
  body('category_id').exists({ checkFalsy: true, checkNull: true }),
]

const create = asyncHandler(async (req, res) => {
  const { name, sum, date, category_id } = req.body
  const { id: user_id } = req.user

  const expenseCategory = await ExpenseCategory.findById(category_id)

  if (expenseCategory) {
    return res.status(422).json({ error: 'Invalid expense category id.' })
  }

  const plannedExpense = await PlannedExpense.findOne({
    category_id: category_id,
  })

  const factExpense = new FactExpense({
    name,
    sum,
    date,
    user_id,
    category_id,
    currency: plannedExpense!.currency,
  })

  await factExpense.save()

  return res
    .status(201)
    .json(pick(factExpense, ['name', 'id', 'sum', 'date', 'category_id']))
})

export default create
