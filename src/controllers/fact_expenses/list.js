import asyncHandler from 'express-async-handler'

import FactExpense from 'models/fact_expense'

/**
 * @api {get} /fact_expenses Get fact expenses
 * @apiName Get fact expenses
 * @apiGroup Fact expenses
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiSuccess {Object[]} fact_expenses Fact expenses
 *
 * @apiSuccessExample Success-Response:
 *  [{
 *      name: 'Car',
 *      id: '123',
 *      sum: 1000,
 *      currency: 'rub',
 *  }]
 */

const list = asyncHandler(async (req, res) => {
  const { id: user_id } = req.user

  const factExpenses = await FactExpense.find(
    { user_id },
    'id name sum currency',
  )

  return res.status(200).json(factExpenses)
})

export default list
