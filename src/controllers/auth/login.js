import jwt from 'jsonwebtoken'

import { jwtOptions } from 'root/passport'

const login = ({ User }) => async (req, res, next) => {
  try {
    const { name, password } = req.body

    if (name && password) {
      const user = await User.findOne({ name })

      if (!user) {
        return res.send({ msg: 'Такого пользователя не существует' })
      }

      const isMatchPassword = await user.comparePassword(password)

      if (isMatchPassword) {
        const payload = { id: user.id }
        const token = jwt.sign(payload, jwtOptions.secretOrKey)

        return res.send({ msg: 'ok', token })
      }

      res.send({ status: 401, msg: 'Неправильные имя или пароль' })
    }
  } catch (err) {
    next(err)
  }
}

export default login
