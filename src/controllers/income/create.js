const create = ({ Income }) => async (req, res, next) => {
  try {
    const { name, sum, id } = req.body
    const { id: user_id } = req.user

    if (name && sum && id) {
      const createdIncome = await Income.findOne({ id })

      if (createdIncome) {
        return res
          .status(400)
          .json({ msg: 'Такая категория доходов уже существует' })
      }

      const income = new Income({ name, sum, id, user_id })

      await income.save()

      return res.status(201).json(income)
    }

    return res.send({ msg: 'invalid req data' })
  } catch (err) {
    console.log(err)
    next(err)
  }
}

export default create
