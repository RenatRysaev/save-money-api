import pick from 'lodash/pick'

/**
 * @api {post} /costs/remove/:id Remove cost
 * @apiName Remove cost
 * @apiGroup Cost
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} id Cost id
 *
 * @apiSuccess {String} id - Cost id
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    id: '456',
 *  }
 */

const remove = ({ Cost }) => async (req, res, next) => {
  try {
    const { id: costId } = req.params
    const { id: user_id } = req.user

    if (!costId) {
      return res.status(400).json({ error: 'invalid req data' })
    }

    const cost = await Cost.findById(costId)

    if (!cost) {
      return res.status(400).json({ error: 'No such category' })
    }

    if (cost.user_id !== user_id) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    const deletedCost = await Cost.findByIdAndRemove(costId)

    return res.status(200).json(pick(deletedCost, ['id']))
  } catch (err) {
    next(err)
  }
}

export default remove
