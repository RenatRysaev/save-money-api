/**
 * @api {get} /costs Get cost list
 * @apiName Get cost list
 * @apiGroup Cost
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiSuccess {Object[]} costs  Cost categories
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

const list = ({ Cost }) => async (req, res, next) => {
  try {
    const { id: user_id } = req.user

    const costs = await Cost.find({ user_id })

    return res.status(200).json(costs)
  } catch (err) {
    next(err)
  }
}

export default list
