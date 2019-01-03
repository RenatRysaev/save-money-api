const create = ({ Cost }) => async (req, res, next) => {
  try {
    const { name, sum, date, id } = req.body
    const { id: user_id } = req.user

    if (name && sum && date && id) {
      const createdCost = await Cost.findOne({ id })

      if (createdCost) {
        return res
          .status(400)
          .json({ msg: 'Такая категория расходов уже существует' })
      }

      const cost = new Cost({ name, sum, date, id, user_id })

      await cost.save()

      return res.status(201).json(cost)
    }

    return res.send({ msg: 'invalid req data' })
  } catch (err) {
    console.log(err)
    next(err)
  }
}

export default create
