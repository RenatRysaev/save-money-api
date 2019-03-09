import asyncHandler from 'express-async-handler'

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
 *      name: 'Salary',
 *      id: '456',
 *      sum: '1000',
 *      group_id: '634634',
 *  }]
 */

const list = asyncHandler(async (req, res) => {
  const { id: user_id } = req.user

  const income = await Income.find({ user_id }, 'name sum id group_id')

  return res.status(200).json(income)
})

export default list
