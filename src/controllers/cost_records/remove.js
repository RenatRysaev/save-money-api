import pick from 'lodash/pick'
import asyncHandler from 'express-async-handler'
import { param } from 'express-validator/check'

import CostRecord from 'models/cost_record'

/**
 * @api {delete} /cost_records/:id Remove cost record
 * @apiName Remove cost record
 * @apiGroup Cost records
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} id Cost record id
 *
 * @apiSuccess {String} id - Cost record id
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    id: '456',
 *  }
 */

export const validationForRemove = [
  param('id').exists({ checkFalsy: true, checkNull: true }),
]

const remove = asyncHandler(async (req, res) => {
  const { id: costRecordId } = req.params
  const { id: user_id } = req.user

  const costRecord = await CostRecord.findById(costRecordId)

  if (!costRecord) {
    return res.status(400).json({ error: 'No such category' })
  }

  if (costRecord.user_id !== user_id) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  const deletedCostRecord = await CostRecord.findByIdAndRemove(costRecordId)

  return res.status(200).json(pick(deletedCostRecord, ['id']))
})

export default remove
