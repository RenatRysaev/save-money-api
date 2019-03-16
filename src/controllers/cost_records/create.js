import asyncHandler from 'express-async-handler'
import { body } from 'express-validator/check'
import pick from 'lodash/pick'

import CostRecord from 'models/cost_record'

/**
 * @api {post} /cost_records/create Create cost record
 * @apiName Create cost record
 * @apiGroup Cost records
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} name Cost record name
 * @apiParam {Number} sum Cost record sum
 * @apiParam {String} currency Cost record currency
 * @apiParam {String} date Cost record date
 *
 * @apiSuccess {String} name Cost record name
 * @apiSuccess {Number} sum Cost record sum
 * @apiSuccess {String} id - Cost record id
 * @apiSuccess {String} currency - Cost record currency
 * @apiSuccess {String} date Cost record date
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    name: 'Coca-cola',
 *    id: '123',
 *    sum: 1000,
 *    date: '20.05.2005',
 *    description: 'Food',
 *    group_id: '268',
 *  }
 */

export const validationForCreate = [
  body('name').exists({ checkFalsy: true }),
  body('sum').exists({ checkFalsy: true }),
  body('currency').exists({ checkFalsy: true }),
  body('date').exists({ checkFalsy: true }),
]

const create = asyncHandler(async (req, res) => {
  const { name, sum, currency, date } = req.body
  const { id: user_id } = req.user

  const costRecord = new CostRecord({ name, sum, currency, date, user_id })

  await costRecord.save()

  return res
    .status(201)
    .json(pick(costRecord, ['name', 'id', 'sum', 'currency', 'date']))
})

export default create
