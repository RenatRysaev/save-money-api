import pick from 'lodash/pick'
import asyncHandler from 'express-async-handler'
import { body } from 'express-validator/check'

import CostCategory from 'models/cost_category'

/**
 * @api {post} /cost_categories/create Create cost category
 * @apiName Create cost category
 * @apiGroup Cost categories
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} name Cost category name
 * @apiParam {Number} sum Planned costs sum
 * @apiParam {String} currency Cost currency
 * @apiParam {String} [description] Cost category description
 * @apiParam {String} [group_id] Group id
 *
 * @apiSuccess {String} id - Cost category id
 * @apiSuccess {String} name - Cost category name
 * @apiSuccess {Number} sum - Planned costs sum
 * @apiSuccess {String} currency - Cost currency
 * @apiSuccess {String} [description] - Cost category description
 * @apiSuccess {String} [group_id] - Group id
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    name: 'Food',
 *    id: '123',
 *    sum: 1000,
 *    currency: 'usd',
 *    description: 'Food cost_categories',
 *    group_id: '268',
 *  }
 */

export const validationForCreate = [
  body('name').exists({ checkFalsy: true }),
  body('sum').exists({ checkFalsy: true }),
  body('currency').exists({ checkFalsy: true }),
]

const create = asyncHandler(async (req, res) => {
  const { name, sum, description, group_id, currency } = req.body
  const { id: user_id } = req.user

  const costCategory = new CostCategory({
    name,
    sum,
    user_id,
    currency,
    description,
    group_id,
  })

  await costCategory.save()

  return res
    .status(201)
    .json(
      pick(costCategory, [
        'name',
        'sum',
        'id',
        'currency',
        'description',
        'group_id',
      ]),
    )
})

export default create
