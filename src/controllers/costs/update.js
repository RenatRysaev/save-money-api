/**
 * @api {post} /costs/update/:id Update cost
 * @apiName Update cost
 * @apiGroup Cost
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} id Cost id
 * @apiParam {String} [sum] Cost sum
 * @apiParam {String} [name] Cost name
 *
 * @apiSuccess {String} name - Cost name
 * @apiSuccess {String} id - Cost id
 * @apiSuccess {String} date - Planned consumption date(format - MM:YYYY)
 * @apiSuccess {String} sum - Cost sum
 * @apiSuccess {String} user_id - User id which belongs cost
 *
 * @apiSuccessExample Success-Response:
 *  {
 *      name: 'some name',
 *      id: 'some id',
 *      date: '12.2018',
 *      sum: '555',
 *      user_id: 'some user id',
 *  }
 */

const update = ({ Cost }) => async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, sum } = req.body
    const { id: user_id } = req.user

    if (!id) {
      return res.status(400).json({ msg: 'Invalid req data' })
    }

    const cost = await Cost.findOne({ id })

    if (cost.user_id !== user_id) {
      return res.status(400).json({ msg: 'Ошибка доступа' })
    }

    const updatedCost = await Cost.findOneAndUpdate(
      { id },
      {
        name: name || cost.name,
        sum: sum || cost.sum,
      },
      { new: true },
    )

    return res.status(200).json(updatedCost)
  } catch (err) {
    next(err)
  }
}

export default update
