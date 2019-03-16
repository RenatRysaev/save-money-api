import pick from 'lodash/pick'
import asyncHandler from 'express-async-handler'
import { param } from 'express-validator/check'

import Cost from 'models/cost_category'

/**
 * @api {patch} /cost_categories/:id Update cost category
 * @apiName Update cost category
 * @apiGroup Cost categories
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} id Cost category id
 * @apiParam {Number} [sum] Planned costs sum
 * @apiParam {String} [name] Cost category name
 * @apiParam {String} [currency] Cost currency
 *
 * @apiSuccess {String} name - Cost category name
 * @apiSuccess {String} id - Cost category id
 * @apiSuccess {Number} sum - Planned costs sum
 * @apiSuccess {String} currency Cost currency
 * @apiSuccess {String} [group_id] - Group id
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    name: 'Food',
 *    id: '234',
 *    sum: 1000,
 *    currency: 'eur',
 *    group_id: '123',
 *  }
 */

export const validationForUpdate = [
  param('id').exists({ checkFalsy: true, checkNull: true }),
]

const update = asyncHandler(async (req, res) => {
  const { id: costId } = req.params
  const { name, sum, currency } = req.body
  const { id: user_id } = req.user

  const cost = await Cost.findById(costId)

  if (cost.user_id !== user_id) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  const updatedCost = await Cost.findByIdAndUpdate(
    costId,
    {
      name: name || cost.name,
      sum: sum || cost.sum,
      currency: currency || cost.currency,
    },
    { new: true },
  )

  return res
    .status(200)
    .json(pick(updatedCost, ['id', 'name', 'sum', 'currency', 'group_id']))
})

export default update
