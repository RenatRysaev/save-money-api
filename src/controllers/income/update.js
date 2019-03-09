import pick from 'lodash/pick'

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
 * @apiSuccess {String} [group_id] - Group id
 *
 * @apiSuccessExample Success-Response:
 *  {
 *      name: 'Salary',
 *      id: '56465',
 *      sum: '1000',
 *      group_id: '1312',
 *  }
 */

const update = ({ Income }) => async (req, res, next) => {
  try {
    const { id: incomeId } = req.params
    const { name, sum } = req.body
    const { id: user_id } = req.user

    if (!incomeId) {
      return res.status(400).json({ error: 'Invalid req data' })
    }

    const income = await Income.findById(incomeId)

    if (income.user_id !== user_id) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    const updatedIncome = await Income.findByIdAndRemove(
      incomeId,
      {
        name: name || income.name,
        sum: sum || income.sum,
      },
      { new: true },
    )

    return res.status(200).json(pick(updatedIncome, ['id', 'name', 'sum']))
  } catch (err) {
    next(err)
  }
}

export default update
