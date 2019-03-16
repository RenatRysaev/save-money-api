import pick from 'lodash/pick'
import asyncHandler from 'express-async-handler'
import { param } from 'express-validator/check'

import CostCategory from 'models/cost_category'

/**
 * @api {delete} /cost_categories/:id Remove cost category
 * @apiName Remove cost category
 * @apiGroup Cost categories
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} id Cost category id
 *
 * @apiSuccess {String} id - Cost category id
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    id: '456',
 *  }
 */

export const validationForRemove = [
  param('id').exists({ checkFalsy: true, checkNull: true }),
]

const remove = asyncHandler(async (req, res) => {
  const { id: costCategoryId } = req.params
  const { id: user_id } = req.user

  const costCategory = await CostCategory.findById(costCategoryId)

  if (!costCategory) {
    return res.status(400).json({ error: 'No such category' })
  }

  if (costCategory.user_id !== user_id) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  const deletedCostCategory = await CostCategory.findByIdAndRemove(
    costCategoryId,
  )

  return res.status(200).json(pick(deletedCostCategory, ['id']))
})

export default remove
