import asyncHandler from 'express-async-handler'
import { param } from 'express-validator/check'
import { Request, Response } from 'express'
import { toString } from 'lodash'

import Income from '../model'

/**
 * @api {patch} /income/:id Update income
 * @apiName Update income
 * @apiGroup Income
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} id Income id
 * @apiParam {String} [name] Income name
 * @apiParam {Number} [sum] Income sum
 * @apiParam {String} [currency] Income currency
 *
 * @apiSuccess {String} id Income id
 * @apiSuccess {String} name Income name
 * @apiSuccess {Number} sum Income sum
 * @apiSuccess {String} currency Income currency
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    name: 'Salary',
 *    id: 'as98767asd',
 *    sum: 1000,
 *    currency: 'USD',
 *  }
 */

export const validationForUpdate = [param('id').exists({ checkFalsy: true })]

const update = asyncHandler(async (req: Request, res: Response) => {
  const { id: income_id } = req.params
  const { id: user_id } = req.user
  const { name, sum, currency } = req.body

  const income = await Income.findById(income_id)

  if (toString(income!.user_id) !== toString(user_id)) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  const updatedIncome = await Income.findByIdAndUpdate(
    income_id,
    {
      name: name || income!.name,
      sum: sum || income!.sum,
      currency: currency || income!.currency,
    },
    { new: true },
  )

  return res.status(200).json(updatedIncome)
})

export default update
