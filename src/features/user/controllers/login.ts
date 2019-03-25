import jwt from 'jsonwebtoken'
import { pick } from 'lodash'
import asyncHandler from 'express-async-handler'
import { body } from 'express-validator/check'
import { Request, Response } from 'express'

import User from '../model'

import { jwtOptions } from 'root/passport'

/**
 * @api {post} /user/login User login
 * @apiName Login
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiParam {String} login User login
 * @apiParam {String} password User password
 *
 * @apiSuccess {String} token Token
 * @apiSuccess {String} _id User id
 * @apiSuccess {String} name User name
 * @apiSuccess {String} login User login
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    token: 'as78u987asa56sa5s6',
 *    _id: '123',
 *    name: 'Steve'
 *    login: 'super-hero',
 *  },
 */

export const validationForLogin = [
  body('login').exists({ checkFalsy: true }),
  body('password').exists({ checkFalsy: true }),
]

const login = asyncHandler(async (req: Request, res: Response) => {
  const { login: userLogin, password } = req.body

  const user = await User.findOne({ login: userLogin })

  if (!user) {
    return res.status(401).json({ error: 'Wrong login or password' })
  }

  const isMatchPassword = await user.comparePassword(password)

  if (isMatchPassword) {
    const payload = { id: user.id }
    const token = jwt.sign(payload, jwtOptions.secretOrKey, { expiresIn: '5h' })

    return res.status(200).json({
      ...pick(user, ['login', 'id']),
      token: `Bearer ${token}`,
    })
  }

  return res.status(401).json({ error: 'Wrong login or password' })
})

export default login
