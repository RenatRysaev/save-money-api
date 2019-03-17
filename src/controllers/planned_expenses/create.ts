import { pick } from 'lodash'
import asyncHandler from 'express-async-handler'
import { body } from 'express-validator/check'

import PlannedExpense from 'models/planned_expense'

/**
 * @api {post} /planned_expenses/create Create planned expense
 * @apiName Create planned expense
 * @apiGroup Planned expenses
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} name Planned expense name
 * @apiParam {Number} sum Planned expense sum
 * @apiParam {String} currency Planned expense currency
 * @apiParam {String} category_id Planned expense category id
 * @apiParam {String} [description] Planned expense description
 * @apiParam {String} [group_id] Group id
 *
 * @apiSuccess {String} id Planned expense id
 * @apiSuccess {String} name Planned expense name
 * @apiSuccess {Number} sum Planned expense sum
 * @apiSuccess {String} currency Planned expense currency
 * @apiSuccess {String} category_id Planned expense category id
 * @apiSuccess {String} [description] Planned expense description
 * @apiSuccess {String} [group_id] Group id
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    name: 'Food',
 *    id: '123',
 *    category_id: 'as2342df',
 *    sum: 1000,
 *    currency: 'usd',
 *    description: 'Food lorem ipsum',
 *    group_id: '268',
 *  }
 */

export const validationForCreate = [
  body('name').exists({ checkFalsy: true }),
  body('sum').exists({ checkFalsy: true }),
  body('currency').exists({ checkFalsy: true }),
  body('category_id').exists({ checkFalsy: true }),
]

const create = asyncHandler(async (req, res) => {
  const { name, sum, description, group_id, currency, category_id } = req.body
  const { id: user_id } = req.user

  const plannedExpense = new PlannedExpense({
    name,
    sum,
    user_id,
    currency,
    description,
    group_id,
    category_id,
  })

  await plannedExpense.save()

  return res
    .status(201)
    .json(
      pick(plannedExpense, [
        'name',
        'sum',
        'id',
        'currency',
        'description',
        'group_id',
        'category_id',
      ]),
    )
})

export default create
