/**
 * @api {get} /costs Get cost list
 * @apiName Get cost list
 * @apiGroup Cost
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} [group_id] Group id
 *
 * @apiSuccess {Object[]} costs  Cost categories
 *
 * @apiSuccessExample Success-Response:
 *  [{
 *      name: 'Car',
 *      id: '123',
 *      sum: '1000',
 *      group_id: 243,
 *  }]
 */

const list = ({ Cost }) => async (req, res, next) => {
  try {
    const { id: user_id } = req.user

    const costs = await Cost.find({ user_id }, 'id name sum group_id')

    return res.status(200).json(costs)
  } catch (err) {
    next(err)
  }
}

export default list
