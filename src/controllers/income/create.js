import pick from 'lodash/pick'
import asyncHandler from 'express-async-handler'

import Income from 'models/income'

/**
 * @api {post} /income/create Create income
 * @apiName Create income
 * @apiGroup Income
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} name Income name
 * @apiParam {String} sum Income sum
 * @apiParam {String} [group_id] Group id
 *
 * @apiSuccess {String} name - Income name
 * @apiSuccess {String} id - Income id
 * @apiSuccess {String} sum - Income sum
 * @apiSuccess {String} [group_id] Group id
 *
 * @apiSuccessExample Success-Response:
 *  {
 *      name: 'salaries',
 *      id: '123',
 *      sum: '1000',
 *      group_id: '634634',
 *  }
 */

const create = asyncHandler(async (req, res) => {
  const { name, sum, group_id } = req.body
  const { id: user_id } = req.user

  if (!name || !sum) {
    return res.status(400).json({ error: 'invalid data' })
  }

  const income = new Income({ name, sum, user_id, group_id })

  await income.save()

  return res.status(201).json(pick(income, ['name', 'id', 'sum', 'group_id']))
})

export default create
