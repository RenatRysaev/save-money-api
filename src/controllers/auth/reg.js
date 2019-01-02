import uuid from 'uuid'
import jwt from 'jsonwebtoken'

import { jwtOptions } from 'root/passport'

const reg = ({ User }) => async (req, res, next) => {
  try {
    const { name, password } = req.body

    if (name && password) {
      const createdUser = await User.findOne({ name })

      if (createdUser) {
        return res.send({ msg: 'Такой пользователь уже существует' })
      }

      const user = new User({ name, password, id: uuid.v4() })
      const payload = { id: user.id }
      const token = jwt.sign(payload, jwtOptions.secretOrKey)

      await user.save()

      return res.send({ name: user.name, id: user.id, token })
    }

    res.send({ msg: 'invalid data' })
  } catch (err) {
    next(err)
  }
}

export default reg
