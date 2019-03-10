import { jwtOptions } from 'root/passport'
import pick from 'lodash/pick'
import asyncHandler from 'express-async-handler'
import { body } from 'express-validator/check'

import User from 'models/user'

/**
 * @api {post} /reg User registration
 * @apiName Registration
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name User name
 * @apiParam {String} password User password
 *
 * @apiSuccess {String} name - User name
 * @apiSuccess {String} id - User id
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    name: 'Alex',
 *    id: '879',
 *  }
 */

export const validationForReg = [
  body('name').exists({ checkFalsy: true }),
  body('password').exists({ checkFalsy: true }),
]

const reg = asyncHandler(async (req, res) => {
  const { name, password } = req.body

  const createdUser = await User.findOne({ name })

  if (createdUser) {
    return res.status(400).json({ error: 'Already exists' })
  }

  const user = new User({ name, password })

  await user.save()

  return res.status(200).json(pick(user, ['name', 'id']))
})

export default reg
