import asyncHandler from 'express-async-handler'
import { body } from 'express-validator/check'
import { Types } from 'mongoose'
import { Request, Response } from 'express'

import Income from '../model'

/**
 * @api {post} /income/create Create income
 * @apiName Create income
 * @apiGroup Income
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} name Income name
 * @apiParam {Number} sum Income sum
 * @apiParam {String} currency Income currency
 *
 * @apiSuccess {String} id Income id
 * @apiSuccess {String} name Income name
 * @apiSuccess {Number} sum Income sum
 * @apiSuccess {String} currency Income currency
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    id: '1as90ascf23',
 *    name: 'salaries',
 *    sum: 1000,
 *    currency: 'RUB',
 *  }
 */

export const validationForCreate = [
  body('name').exists({ checkFalsy: true }),
  body('sum').exists({ checkFalsy: true }),
  body('currency').exists({ checkFalsy: true }),
]

const create = asyncHandler(async (req: Request, res: Response) => {
  const { name, sum, currency } = req.body
  const { id: user_id } = req.user

  const income = new Income({
    _id: Types.ObjectId(),
    user_id,
    name,
    sum,
    currency,
  })

  await income.save()

  return res.status(201).json(income)
})

export default create
