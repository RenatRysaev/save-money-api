import { pick } from 'lodash'
import asyncHandler from 'express-async-handler'
import { param } from 'express-validator/check'
import { Request, Response } from 'express'
import { toString } from 'lodash'

import Income from '../model'

/**
 * @api {delete} /income/:id Remove income
 * @apiName Remove income
 * @apiGroup Income
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} id Income id
 *
 * @apiSuccess {String} id Income id
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    id: '123',
 *  }
 */

export const validationForRemove = [param('id').exists({ checkFalsy: true })]

const remove = asyncHandler(async (req: Request, res: Response) => {
  const { id: income_id } = req.params
  const { id: user_id } = req.user

  const income = await Income.findById(income_id)

  if (!income) {
    return res.status(400).json({ error: 'No such category' })
  }

  if (toString(income!.user_id) !== toString(user_id)) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  const deletedIncome = await Income.findByIdAndRemove(income_id)

  return res.status(200).json(pick(deletedIncome, ['id']))
})

export default remove
