import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import { Types } from 'mongoose'
import { body } from 'express-validator/check'

import Expense from '../model'

/**
 * @api {post} /expenses/create Create expense
 * @apiName Create expense
 * @apiGroup Expenses
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} name Expense name
 * @apiParam {Number} sum Expense sum
 * @apiParam {String} date Expense date (YYYY.MM.DD)
 * @apiParam {String="planned","actual"} type Expense type
 * @apiParam {String="permanent","one_time"} kind Expense kind
 * @apiParam {String="RUB","USD","EUR"} currency Expense currency
 *
 * @apiSuccess {String} id Expense id
 * @apiSuccess {String} name Expense name
 * @apiSuccess {Number} sum Expense sum
 * @apiSuccess {String} date Expense date
 * @apiSuccess {String} type Expense type
 * @apiSuccess {String} kind Expense kind
 * @apiSuccess {String} currency Expense currency
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    id: 'afd99867dsdfv',
 *    name: 'Food',
 *    sum: 20000,
 *    date: '2019.20.05'
 *    currency: 'RUB',
 *    type: 'planned',
 *    kind: 'permanent',
 *  }
 */

export const validationForCreate = [
  body('name').exists({ checkFalsy: true }),
  body('sum').exists({ checkFalsy: true }),
  body('date').exists({ checkFalsy: true }),
  body('currency').exists({ checkFalsy: true }),
  body('kind').exists({ checkFalsy: true }),
  body('type').exists({ checkFalsy: true }),
]

const create = asyncHandler(async (req: Request, res: Response) => {
  const { name, sum, date, currency, kind, type } = req.body
  const { id: user_id } = req.user

  const expense = new Expense({
    _id: Types.ObjectId(),
    user_id,
    currency,
    kind,
    type,
    name,
    sum,
    date: new Date(date),
  })

  await expense.save()

  return res.status(201).json(expense)
})

export default create
