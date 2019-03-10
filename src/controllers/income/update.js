import pick from 'lodash/pick'
import asyncHandler from 'express-async-handler'
import { param } from 'express-validator/check'

import Income from 'models/income'

/**
 * @api {patch} /income/:id Update income
 * @apiName Update income
 * @apiGroup Income
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} id Income id
 * @apiParam {String} [sum] Income sum
 * @apiParam {String} [name] Income name
 *
 * @apiSuccess {String} name - Income name
 * @apiSuccess {String} id - Income id
 * @apiSuccess {String} sum - Income sum
 * @apiSuccess {String} [group_id] - Group id
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    name: 'Salary',
 *    id: '56465',
 *    sum: '1000',
 *    group_id: '1312',
 *  }
 */

export const validationForUpdate = [
  param('id').exists({ checkFalsy: true, checkNull: true }),
]

const update = asyncHandler(async (req, res) => {
  const { id: incomeId } = req.params
  const { name, sum } = req.body
  const { id: user_id } = req.user

  const income = await Income.findById(incomeId)

  if (income.user_id !== user_id) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  const updatedIncome = await Income.findByIdAndRemove(
    incomeId,
    {
      name: name || income.name,
      sum: sum || income.sum,
    },
    { new: true },
  )

  return res.status(200).json(pick(updatedIncome, ['id', 'name', 'sum']))
})

export default update
