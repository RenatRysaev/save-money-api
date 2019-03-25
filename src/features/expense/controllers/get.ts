import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import { body } from 'express-validator/check'

import Expense from '../model'

/**
 * @api {get} /expenses Get expenses
 * @apiName Get expenses
 * @apiGroup Expenses
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String="planned","fact"} [type] Query for get expenses by type
 *
 * @apiSuccess {Object[]} expenses Expenses
 *
 * @apiSuccessExample Success-Response:
 *  [{
 *      name: 'Car',
 *      id: '123',
 *      sum: 1000,
 *      currency: 'RUB',
 *      type: 'fact',
 *      kind: 'one_time',
 *      date: '29.05.2019'
 *  }]
 */

export const validationForCreate = [body('name').exists({ checkFalsy: true })]

const get = asyncHandler(async (req: Request, res: Response) => {
  const { id: user_id } = req.user
  const { type } = req.query
  const queryConditions = Object.assign({}, { user_id }, type && { type })

  const expenses = await Expense.find(queryConditions)

  return res.status(200).json(expenses)
})

export default get
