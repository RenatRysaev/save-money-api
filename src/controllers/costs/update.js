const update = ({ Cost }) => async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, sum } = req.body
    const { id: user_id } = req.user

    if (!id) {
      return res.status(400).json({ msg: 'Invalid req data' })
    }

    const cost = await Cost.findOne({ id })

    if (cost.user_id !== user_id) {
      return res.status(400).json({ msg: 'Ошибка доступа' })
    }

    const updatedCost = await Cost.findOneAndUpdate(
      { id },
      {
        name: name || cost.name,
        sum: sum || cost.date,
      },
      { new: true },
    )

    return res.status(200).json(updatedCost)
  } catch (err) {
    next(err)
  }
}

export default update
