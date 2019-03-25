import asyncHandler from 'express-async-handler'
import { body } from 'express-validator/check'
import { Types } from 'mongoose'
import { pick } from 'lodash'

import User from '../model'

/**
 * @api {post} /user/reg User registration
 * @apiName Registration
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name User name
 * @apiParam {String} login User login
 * @apiParam {String} password User password
 *
 * @apiSuccess {String} name User name
 * @apiSuccess {String} login User login
 * @apiSuccess {String} _id User id
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    login: 'super-hero',
 *    name: 'Renat',
 *    _id: '879',
 *  }
 */

export const validationForRegistration = [
  body('name').exists({ checkFalsy: true }),
  body('login').exists({ checkFalsy: true }),
  body('password').exists({ checkFalsy: true }),
]

const registration = asyncHandler(async (req, res) => {
  const { name, login, password } = req.body

  const createdUser = await User.findOne({ login })

  if (createdUser) {
    return res.status(400).json({ error: 'Already exists' })
  }

  const user = new User({ name, login, password, _id: new Types.ObjectId() })

  await user.save()

  return res.status(200).json(pick(user, ['id', 'name', 'login']))
})

export default registration
