import pick from 'lodash/pick'
import asyncHandler from 'express-async-handler'
import { param } from 'express-validator/check'

import CostRecord from 'models/cost_record'

/**
 * @api {patch} /cost_records/:id Update cost record
 * @apiName Update cost record
 * @apiGroup Cost records
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} id Cost record id
 * @apiParam {Number} [sum] Сost sum
 * @apiParam {String} [name] Cost record name
 * @apiParam {String} [currency] Cost currency
 *
 * @apiSuccess {String} name - Cost record name
 * @apiSuccess {String} id - Cost record id
 * @apiSuccess {Number} sum - Сost sum
 * @apiSuccess {String} currency Cost currency
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    name: 'Food',
 *    id: '234',
 *    sum: 1000,
 *    currency: 'eur',
 *  }
 */

export const validationForUpdate = [
  param('id').exists({ checkFalsy: true, checkNull: true }),
]

const update = asyncHandler(async (req, res) => {
  const { id: costRecordId } = req.params
  const { name, sum, currency } = req.body
  const { id: user_id } = req.user

  const costRecord = await CostRecord.findById(costRecordId)

  if (costRecord.user_id !== user_id) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  const updatedCostRecord = await CostRecord.findByIdAndUpdate(
    costRecordId,
    {
      name: name || costRecord.name,
      sum: sum || costRecord.sum,
      currency: currency || costRecord.currency,
    },
    { new: true },
  )

  return res
    .status(200)
    .json(pick(updatedCostRecord, ['id', 'name', 'sum', 'currency']))
})

export default update
