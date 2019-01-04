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
 * @apiSuccess {String} name - Cost name
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

const remove = ({ Cost }) => async (req, res, next) => {
  try {
    const { id } = req.params
    const { id: user_id } = req.user

    if (!id) {
      return res.status(400).json({ msg: 'Invalid req data' })
    }

    const cost = await Cost.findOne({ id })

    if (!cost) {
      return res.status(400).json({ msg: 'Такой катеогории не существует' })
    }

    if (cost.user_id !== user_id) {
      return res.status(403).json({ msg: 'Ошибка доступа' })
    }

    const deletedCost = await Cost.findOneAndRemove({ id })

    return res.status(200).json(deletedCost)
  } catch (err) {
    next(err)
  }
}

export default remove
