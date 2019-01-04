/**
 * @api {post} /income/update/:id Update income
 * @apiName Update income
 * @apiGroup Income
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} id Income id
 * @apiParam {String} [sum] Income sum
 * @apiParam {String} [name] Income name
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

const update = ({ Income }) => async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, sum } = req.body
    const { id: user_id } = req.user

    if (!id) {
      return res.status(400).json({ msg: 'Invalid req data' })
    }

    const income = await Income.findOne({ id })

    if (income.user_id !== user_id) {
      return res.status(400).json({ msg: 'Ошибка доступа' })
    }

    const updatedIncome = await Income.findOneAndUpdate(
      { id },
      {
        name: name || income.name,
        sum: sum || income.sum,
      },
      { new: true },
    )

    return res.status(200).json(updatedIncome)
  } catch (err) {
    next(err)
  }
}

export default update
