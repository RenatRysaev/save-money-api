import asyncHandler from 'express-async-handler'

import CostCategory from 'models/cost_category'

/**
 * @api {get} /cost_categories Get cost categories
 * @apiName Get cost categories
 * @apiGroup Cost categories
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} [group_id] Group id
 *
 * @apiSuccess {Object[]} cost_categories  Cost categories
 *
 * @apiSuccessExample Success-Response:
 *  [{
 *      name: 'Car',
 *      id: '123',
 *      sum: 1000,
 *      currency: 'rub',
 *      group_id: '243',
 *  }]
 */

const list = asyncHandler(async (req, res) => {
  const { id: user_id } = req.user

  const costCategories = await CostCategory.find(
    { user_id },
    'id name sum currency group_id',
  )

  return res.status(200).json(costCategories)
})

export default list
