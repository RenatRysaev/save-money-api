/**
 * @api {post} /costs/create Create cost
 * @apiName Create cost
 * @apiGroup Cost
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 *
 * @apiParam {String} id Cost id
 * @apiParam {String} name Cost name
 * @apiParam {String} sum Cost sum
 * @apiParam {String} date Planned consumption date(format - MM:YYYY)
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

const create = ({ Cost }) => async (req, res, next) => {
  try {
    const { name, sum, date, id } = req.body
    const { id: user_id } = req.user

    if (name && sum && date && id) {
      const createdCost = await Cost.findOne({ id })

      if (createdCost) {
        return res
          .status(400)
          .json({ msg: 'Такая категория расходов уже существует' })
      }

      const cost = new Cost({ name, sum, date, id, user_id })

      await cost.save()

      return res.status(201).json(cost)
    }

    return res.send({ msg: 'invalid req data' })
  } catch (err) {
    console.log(err)
    next(err)
  }
}

export default create
