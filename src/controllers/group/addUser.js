import pick from 'lodash/pick'
import asyncHandler from 'express-async-handler'

/**
 * @api {post} /group/add_user Add user into group
 * @apiName Add user into group
 * @apiGroup Group
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} group_id Group id
 * @apiParam {String[]} users_id User id
 *
 * @apiSuccess {String} id - Group id
 * @apiSuccess {String[]} id - Group users
 *
 * @apiSuccessExample Success-Response:
 *  {
 *      name: 'super group',
 *      id: '9839238',
 *      users_id: [1, 5, 888],
 *  }
 */

const addUser = asyncHandler(async (req, res) => {
  const { group_id, users_id } = req.body
  const { id: user_id } = req.user

  if (!group_id || !users_id) {
    return res.status(400).json({ error: 'invalid data' })
  }

  const group = await Group.findById(group_id)

  if (!group) {
    return res.status(400).json({ error: 'No such group' })
  }

  const isCreator = group.creator_user_id === user_id

  if (!isCreator) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  const newDataForGroup = {
    ...group._doc,
    users_id: group.users_id.concat(users_id),
  }

  const updatedGroup = await Group.findByIdAndUpdate(
    group_id,
    newDataForGroup,
    { new: true },
  )

  return res.status(200).json(pick(updatedGroup, ['id', 'name', 'users_id']))
})

export default addUser
