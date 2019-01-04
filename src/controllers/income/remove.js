/**
 * @api {post} /income/remove/:id Remove income
 * @apiName Remove income
 * @apiGroup Income
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
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

const remove = ({ Income }) => async (req, res, next) => {
  try {
    const { id } = req.params
    const { id: user_id } = req.user

    if (!id) {
      return res.status(400).json({ msg: 'Invalid req data' })
    }

    const income = await Income.findOne({ id })

    if (!income) {
      return res.status(400).json({ msg: 'Такой катеогории не существует' })
    }

    if (income.user_id !== user_id) {
      return res.status(400).json({ msg: 'Ошибка доступа' })
    }

    const deletedIncome = await Income.findOneAndRemove({ id })

    return res.status(200).json(deletedIncome)
  } catch (err) {
    next(err)
  }
}

export default remove
