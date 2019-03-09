import pick from 'lodash/pick'
import asyncHandler from 'express-async-handler'

/**
 * @api {post} /costs/create Create cost
 * @apiName Create cost
 * @apiGroup Cost
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} name Cost name
 * @apiParam {String} sum Cost sum
 * @apiParam {String} [description] Cost description
 * @apiParam {String} [group_id] Group id
 *
 * @apiSuccess {String} name - Cost name
 * @apiSuccess {String} id - Cost id
 * @apiSuccess {String} sum - Cost sum
 * @apiSuccess {String} [description] - Cost description
 * @apiSuccess {String} [group_id] - Group id
 *
 * @apiSuccessExample Success-Response:
 *  {
 *      name: 'Food',
 *      id: '123',
 *      sum: '1000',
 *      description: 'Food costs',
 *      group_id: 268,
 *  }
 */

const create = asyncHandler(async (req, res) => {
  const { name, sum, description, group_id } = req.body
  const { id: user_id } = req.user

  if (!name || !sum) {
    return res.status(400).json({ error: 'invalid req data' })
  }

  const cost = new Cost({ name, sum, user_id, description, group_id })

  await cost.save()

  return res
    .status(201)
    .json(pick(cost, ['name', 'sum', 'id', 'description', 'group_id']))
})

export default create
