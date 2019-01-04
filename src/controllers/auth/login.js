import jwt from 'jsonwebtoken'

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
 *
 * @apiSuccessExample Success-Response:
 *  {
 *      token: 'some token'
 *  }
 */

const login = ({ User }) => async (req, res, next) => {
  try {
    const { name, password } = req.body

    if (name && password) {
      const user = await User.findOne({ name })

      if (!user) {
        return res
          .status(401)
          .json({ msg: 'Такого пользователя не существует' })
      }

      const isMatchPassword = await user.comparePassword(password)

      if (isMatchPassword) {
        const payload = { id: user.id }
        const token = jwt.sign(payload, jwtOptions.secretOrKey)

        return res.status(200).json({ msg: 'ok', token })
      }

      res.status(401).json({ msg: 'Неправильные имя или пароль' })
    }
  } catch (err) {
    next(err)
  }
}

export default login
