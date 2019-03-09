import pick from 'lodash/pick'
import asyncHandler from 'express-async-handler'

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
 *      name: 'Super group',
 *      id: '555',
 *  }
 */

const create = asyncHandler(async (req, res) => {
  const { name } = req.body
  const { id: creator_user_id } = req.user

  if (!name) {
    return res.status(400).json({ error: 'invalid data' })
  }

  const group = new Group({ name, creator_user_id })

  await group.save()

  return res.status(201).json(pick(group, ['id', 'name']))
})

export default create
