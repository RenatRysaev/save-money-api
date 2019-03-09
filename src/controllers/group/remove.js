import pick from 'lodash/pick'

/**
 * @api {post} /group/remove/:id Remove group
 * @apiName Remove group
 * @apiGroup Group
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} id Group id
 *
 * @apiSuccess {String} id - Group id
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    id: '555',
 *  }
 */

const remove = ({ Group }) => async (req, res, next) => {
  try {
    const { id: groupId } = req.params
    const { id: creatorUserId } = req.user

    if (!groupId) {
      return res.status(400).json({ error: 'Invalid data' })
    }

    const group = await Group.findById(groupId)
    const isCreator = group.creator_user_id === creatorUserId

    if (!isCreator) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    const deletedGroup = await Group.findByIdAndRemove(groupId)

    return res.status(200).json(pick(deletedGroup, ['id']))
  } catch (err) {
    next(err)
  }
}

export default remove
