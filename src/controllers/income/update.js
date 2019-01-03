const update = ({ Income }) => async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, sum } = req.body
    const { id: user_id } = req.user

    if (!id) {
      return res.status(400).json({ msg: 'Invalid req data' })
    }

    const income = await Income.findOne({ id })

    if (income.user_id !== user_id) {
      return res.status(400).json({ msg: 'Ошибка доступа' })
    }

    const updatedIncome = await Income.findOneAndUpdate(
      { id },
      {
        name: name || income.name,
        sum: sum || income.sum,
      },
      { new: true },
    )

    return res.status(200).json(updatedIncome)
  } catch (err) {
    next(err)
  }
}

export default update
