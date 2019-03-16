import asyncHandler from 'express-async-handler'
import { body } from 'express-validator/check'
import pick from 'lodash/pick'

import FactExpense from 'models/fact_expense'

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
 * @apiParam {String} currency Fact expenses currency
 * @apiParam {String} date Fact expenses date
 *
 * @apiSuccess {String} name Fact expenses name
 * @apiSuccess {Number} sum Fact expenses sum
 * @apiSuccess {String} id Fact expenses id
 * @apiSuccess {String} currency Fact expenses currency
 * @apiSuccess {String} date Fact expenses date
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    name: 'Coca-cola',
 *    id: '123',
 *    sum: 1000,
 *    date: '20.05.2005',
 *    description: 'Food',
 *    group_id: '268',
 *  }
 */

export const validationForCreate = [
  body('name').exists({ checkFalsy: true }),
  body('sum').exists({ checkFalsy: true }),
  body('currency').exists({ checkFalsy: true }),
  body('date').exists({ checkFalsy: true }),
]

const create = asyncHandler(async (req, res) => {
  const { name, sum, currency, date } = req.body
  const { id: user_id } = req.user

  const factExpense = new FactExpense({ name, sum, currency, date, user_id })

  await factExpense.save()

  return res
    .status(201)
    .json(pick(factExpense, ['name', 'id', 'sum', 'currency', 'date']))
})

export default create
