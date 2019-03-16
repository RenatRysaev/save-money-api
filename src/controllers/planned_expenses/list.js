import asyncHandler from 'express-async-handler'

import PlannedExpense from 'models/planned_expense'

/**
 * @api {get} /planned_expenses Get planned expenses
 * @apiName Get planned expenses
 * @apiGroup Planned expenses
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiParam {String} [group_id] Group id
 *
 * @apiSuccess {Object[]} planned_expenses Planned expenses
 *
 * @apiSuccessExample Success-Response:
 *  [{
 *      name: 'Car',
 *      id: '123',
 *      sum: 1000,
 *      currency: 'rub',
 *      group_id: '243',
 *      category_id: 'as2342df',
 *      currency: 'eur',
 *  }]
 */

const list = asyncHandler(async (req, res) => {
  const { id: user_id } = req.user

  const plannedExpenses = await PlannedExpense.find(
    { user_id },
    'id name sum currency group_id category_id',
  )

  return res.status(200).json(plannedExpenses)
})

export default list
