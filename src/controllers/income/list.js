/**
 * @api {get} /income Get income list
 * @apiName Get income list
 * @apiGroup Income
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiSuccess {Object[]} income Income categories
 *
 * @apiSuccessExample Success-Response:
 *  [{
 *      name: 'some name',
 *      id: 'some id',
 *      date: '12.2018',
 *      sum: '555',
 *      user_id: 'some user id',
 *  }]
 */

const list = ({ Income }) => async (req, res, next) => {
  try {
    const { id: user_id } = req.user

    const income = await Income.find({ user_id })

    return res.status(200).json(income)
  } catch (err) {
    next(err)
  }
}

export default list
