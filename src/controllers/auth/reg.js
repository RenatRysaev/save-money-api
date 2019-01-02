import uuid from 'uuid'

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

      return res.send({ name: user.name })
    }

    res.send({ msg: 'invalid data' })
  } catch (err) {
    next(err)
  }
}

export default reg
