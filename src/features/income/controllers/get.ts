import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'

import Income from '../model'

/**
 * @api {get} /income Get incomes
 * @apiName Get incomes
 * @apiGroup Income
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiSuccess {Object[]} income Income categories
 *
 * @apiSuccessExample Success-Response:
 *  [{
 *    id: 'jk89afdc90',
 *    name: 'Salary',
 *    sum: 1000,
 *    currency: 'RUB',
 *  }]
 */

const get = asyncHandler(async (req: Request, res: Response) => {
  const { id: user_id } = req.user

  const income = await Income.find({ user_id })

  return res.status(200).json(income)
})

export default get
