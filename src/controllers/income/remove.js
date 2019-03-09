import pick from 'lodash/pick'

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
 * @apiSuccess {String} id - Income id
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    id: '123',
 *  }
 */

const remove = ({ Income }) => async (req, res, next) => {
  try {
    const { id: incomeId } = req.params
    const { id: user_id } = req.user

    if (!incomeId) {
      return res.status(400).json({ error: 'Invalid req data' })
    }

    const income = await Income.findById(incomeId)

    if (!income) {
      return res.status(400).json({ error: 'No such category' })
    }

    if (income.user_id !== user_id) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    const deletedIncome = await Income.findByIdAndRemove(incomeId)

    return res.status(200).json(pick(deletedIncome, ['id']))
  } catch (err) {
    next(err)
  }
}

export default remove
