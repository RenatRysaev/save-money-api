import pick from 'lodash/pick'
import asyncHandler from 'express-async-handler'
import { param } from 'express-validator/check'

import Group from 'models/group'

/**
 * @api {delete} /group/:id Remove group
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

export const validationForRemove = [
  param('name').exists({ checkNull: true, checkFalsy: true }),
]

const remove = asyncHandler(async (req, res) => {
  const { id: groupId } = req.params
  const { id: creatorUserId } = req.user

  const group = await Group.findById(groupId)
  const isCreator = group.creator_user_id === creatorUserId

  if (!isCreator) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  const deletedGroup = await Group.findByIdAndRemove(groupId)

  return res.status(200).json(pick(deletedGroup, ['id']))
})

export default remove
