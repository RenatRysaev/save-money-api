import uuid from 'uuid'

import { jwtOptions } from 'root/passport'

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
 *      name: 'some name',
 *      id: 'some id',
 *  }
 */

const reg = ({ User }) => async (req, res, next) => {
  try {
    const { name, password } = req.body

    if (name && password) {
      const createdUser = await User.findOne({ name })

      if (createdUser) {
        return res.send({ msg: 'Такой пользователь уже существует' })
      }

      const user = new User({ name, password, id: uuid.v4() })

      await user.save()

      // TODO: Нужно ли при регистрации сразу отдавать токен ?
      return res.send({ name: user.name, id: user.id })
    }

    res.send({ msg: 'invalid data' })
  } catch (err) {
    next(err)
  }
}

export default reg
