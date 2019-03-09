import pick from 'lodash/pick'
import asyncHandler from 'express-async-handler'

/**
 * @api {post} /group/update/:id Update group
 * @apiName Update group
 * @apiGroup Group
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} group_id Group id
 * @apiParam {String} [name] Group name
 * @apiParam {String[]} [users_id] Users id
 *
 * @apiSuccess {String} id - Group id
 * @apiSuccess {String[]} id - Group users
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    name: 'super group',
 *    id: '9839238',
 *    users_id: [1, 5, 888],
 *  }
 */

const update = ({ Group }) =>
  asyncHandler(async (req, res) => {
    const { id: group_id } = req.params
    const { users_id, name } = req.body
    const { id: user_id } = req.user

    if (!group_id || !name) {
      return res.status(400).json({ error: 'invalid data' })
    }

    const group = await Group.findById(group_id)
    const isCreator = group.creator_user_id === user_id

    if (!isCreator) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    const newDataForGroup = { name, users_id }

    const updatedGroup = await Group.findByIdAndUpdate(
      group_id,
      newDataForGroup,
      { new: true },
    )

    return res.status(200).json(pick(updatedGroup, ['id', 'name', 'users_id']))
  })

export default update
