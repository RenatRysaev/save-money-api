import pick from 'lodash/pick'
import asyncHandler from 'express-async-handler'
import { param } from 'express-validator/check'

import Income from 'models/income'

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
 * @apiSuccess {String} id - Income id
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    id: '123',
 *  }
 */

export const validationForRemove = [
  param('id').exists({ checkFalsy: true, checkNull: true }),
]

const remove = asyncHandler(async (req, res) => {
  const { id: incomeId } = req.params
  const { id: user_id } = req.user

  const income = await Income.findById(incomeId)

  if (!income) {
    return res.status(400).json({ error: 'No such category' })
  }

  if (income.user_id !== user_id) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  const deletedIncome = await Income.findByIdAndRemove(incomeId)

  return res.status(200).json(pick(deletedIncome, ['id']))
})

export default remove
