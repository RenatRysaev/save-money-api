import pick from 'lodash/pick'

/**
 * @api {post} /group/remove_user/:id Remove user from group
 * @apiName Remove user from group
 * @apiGroup Group
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} user_id User id
 * @apiParam {String} group_id Group id
 *
 * @apiSuccess {String} user_id - User id
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    id: '9839238',
 *  }
 */

const removeUser = ({ Group }) => async (req, res, next) => {
  try {
    const { id: current_user_id } = req.user
    const { id: user_id } = req.params
    const { group_id } = req.body

    if (!group_id || !user_id) {
      return res.status(400).json({ error: 'invalid data' })
    }

    const group = await Group.findById(group_id)

    if (!group) {
      return res.status(400).json({ error: 'No such group' })
    }

    const isCreator = group.creator_user_id === current_user_id

    if (!isCreator) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    const newDataForGroup = {
      ...group._doc,
      users_id: group.users_id.filter(id => id !== user_id),
    }

    const updatedGroup = await Group.findByIdAndUpdate(
      group_id,
      newDataForGroup,
      { new: true },
    )

    return res.status(200).json(pick(updatedGroup, ['id', 'name', 'users_id']))
  } catch (err) {
    next(err)
  }
}

export default removeUser