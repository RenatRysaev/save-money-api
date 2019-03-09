import pick from 'lodash/pick'
import asyncHandler from 'express-async-handler'

import { jwtOptions } from 'root/passport'

import User from 'models/user'

/**
 * @api {post} /check_login User check login
 * @apiName Check login
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    id: '123',
 *    name: 'John'
 *  },
 */

const checkLogin = asyncHandler(async (req, res) => {
  const { id: user_id } = req.user

  const user = await User.findById(user_id)

  res.status(200).json(pick(user, ['id', 'name']))
})

export default checkLogin
