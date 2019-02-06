import pick from 'lodash/pick'

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
 * @apiParam {String} [description] Cost description
 *
 * @apiSuccess {String} name - Cost name
 * @apiSuccess {String} id - Cost id
 * @apiSuccess {String} sum - Cost sum
 * @apiSuccess {String} [description] - Cost description
 *
 * @apiSuccessExample Success-Response:
 *  {
 *      name: 'some name',
 *      id: 'some id',
 *      sum: '555',
 *      description: 'Lorem ipsum'
 *  }
 */

const create = ({ Cost }) => async (req, res, next) => {
  try {
    const { name, sum, id, description } = req.body
    const { id: user_id } = req.user

    if (name && sum && id) {
      const createdCost = await Cost.findOne({ id })

      if (createdCost) {
        return res
          .status(400)
          .json({ msg: 'Такая категория расходов уже существует' })
      }

      const cost = new Cost({ name, sum, id, user_id, description })

      await cost.save()

      return res
        .status(201)
        .json(pick(cost, ['name', 'sum', 'id', 'description']))
    }

    return res.status(400).json({ msg: 'invalid req data' })
  } catch (err) {
    console.log(err)
    next(err)
  }
}

export default create
