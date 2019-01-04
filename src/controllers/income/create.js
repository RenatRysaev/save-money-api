/**
 * @api {post} /income/create Create income
 * @apiName Create income
 * @apiGroup Income
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} name Income name
 * @apiParam {String} sum Income sum
 * @apiParam {String} id Income id
 *
 * @apiSuccess {String} name - Income name
 * @apiSuccess {String} id - Income id
 * @apiSuccess {String} sum - Income sum
 * @apiSuccess {String} user_id - User id which belongs income
 *
 * @apiSuccessExample Success-Response:
 *  {
 *      name: 'some name',
 *      id: 'some id',
 *      sum: '555',
 *      user_id: 'some user id',
 *  }
 */

const create = ({ Income }) => async (req, res, next) => {
  try {
    const { name, sum, id } = req.body
    const { id: user_id } = req.user

    if (name && sum && id) {
      const createdIncome = await Income.findOne({ id })

      if (createdIncome) {
        return res
          .status(400)
          .json({ msg: 'Такая категория доходов уже существует' })
      }

      const income = new Income({ name, sum, id, user_id })

      await income.save()

      return res.status(201).json(income)
    }

    return res.send({ msg: 'invalid req data' })
  } catch (err) {
    console.log(err)
    next(err)
  }
}

export default create
