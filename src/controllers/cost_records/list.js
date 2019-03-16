import asyncHandler from 'express-async-handler'

import CostRecord from 'models/cost_record'

/**
 * @api {get} /cost_records Get cost records
 * @apiName Get cost records
 * @apiGroup Cost records
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiSuccess {Object[]} cost_records  Cost records
 *
 * @apiSuccessExample Success-Response:
 *  [{
 *      name: 'Car',
 *      id: '123',
 *      sum: 1000,
 *      currency: 'rub',
 *  }]
 */

const list = asyncHandler(async (req, res) => {
  const { id: user_id } = req.user

  const costRecords = await CostRecord.find({ user_id }, 'id name sum currency')

  return res.status(200).json(costRecords)
})

export default list
