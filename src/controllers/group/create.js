import pick from 'lodash/pick'
import asyncHandler from 'express-async-handler'
import { body } from 'express-validator/check'

import Group from 'models/group'

/**
 * @api {post} /group/create Create group
 * @apiName Create group
 * @apiGroup Group
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} name Group name
 *
 * @apiSuccess {String} name - Group name
 * @apiSuccess {String} id - Group id
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    name: 'Super group',
 *    id: '555',
 *  }
 */

export const validationForCreate = [
  body('name').exists({ checkNull: true, checkFalsy: true }),
]

const create = asyncHandler(async (req, res) => {
  const { name } = req.body
  const { id: creator_user_id } = req.user

  const group = new Group({ name, creator_user_id })

  await group.save()

  return res.status(201).json(pick(group, ['id', 'name']))
})

export default create
