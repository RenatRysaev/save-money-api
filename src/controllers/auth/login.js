import jwt from 'jsonwebtoken'
import pick from 'lodash/pick'
import asyncHandler from 'express-async-handler'

import User from 'models/user'

import { jwtOptions } from 'root/passport'

/**
 * @api {post} /login User login
 * @apiName Login
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name User name
 * @apiParam {String} password User password
 *
 * @apiSuccess {String} token - Token
 * @apiSuccess {String} id - User id
 * @apiSuccess {String} name - User name
 *
 * @apiSuccessExample Success-Response:
 *    {
 *        token: 'as78u987asa56sa5s6',
 *        id: '123',
 *        name: 'Steve'
 *    },
 */

const login = asyncHandler(async (req, res) => {
  const { name, password } = req.body

  if (!name || !password) {
    return res.status(401).json({ error: 'Invalid data' })
  }

  const user = await User.findOne({ name })

  if (!user) {
    return res.status(401).json({ error: 'Wrong name or password' })
  }

  const isMatchPassword = await user.comparePassword(password)

  if (isMatchPassword) {
    const payload = { id: user.id }
    const token = jwt.sign(payload, jwtOptions.secretOrKey)

    return res.status(200).json({
      ...pick(user, ['name', 'id']),
      token: `Bearer ${token}`,
    })
  }

  return res.status(401).json({ error: 'Wrong name or password' })
})

export default login
