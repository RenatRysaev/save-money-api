import pick from 'lodash/pick'

/**
 * @api {post} /costs/update/:id Update cost
 * @apiName Update cost
 * @apiGroup Cost
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} id Cost id
 * @apiParam {String} sum Cost sum
 * @apiParam {String} name Cost name
 *
 * @apiSuccess {String} name - Cost name
 * @apiSuccess {String} id - Cost id
 * @apiSuccess {String} sum - Cost sum
 * @apiSuccess {String} [group_id] - Group id
 *
 * @apiSuccessExample Success-Response:
 *  {
 *      name: 'Super cost',
 *      id: '234',
 *      sum: '1000',
 *      group_id: '123',
 *  }
 */

const update = ({ Cost }) => async (req, res, next) => {
  try {
    const { id: costId } = req.params
    const { name, sum } = req.body
    const { id: user_id } = req.user

    if (!costId) {
      return res.status(400).json({ error: 'Invalid req data' })
    }

    const cost = await Cost.findById(costId)

    if (cost.user_id !== user_id) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    const updatedCost = await Cost.findByIdAndUpdate(
      costId,
      {
        name: name || cost.name,
        sum: sum || cost.sum,
      },
      { new: true },
    )

    return res
      .status(200)
      .json(pick(updatedCost, ['id', 'name', 'sum', 'group_id']))
  } catch (err) {
    next(err)
  }
}

export default update
