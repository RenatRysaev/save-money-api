import { pick } from 'lodash'
import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'

import User from '../model'

/**
 * @api {post} /user/check_login User check login
 * @apiName Check login
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    id: '123',
 *    name: 'John',
 *    login: 'super-hero',
 *  },
 */

const checkLogin = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.user

  const user = await User.findById(id)

  res.status(200).json(pick(user, ['id', 'name', 'login']))
})

export default checkLogin
