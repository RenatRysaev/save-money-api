const remove = ({ Cost }) => async (req, res, next) => {
  try {
    const { id } = req.params
    const { id: user_id } = req.user

    if (!id) {
      return res.status(400).json({ msg: 'Invalid req data' })
    }

    const cost = await Cost.findOne({ id })

    if (!cost) {
      return res.status(400).json({ msg: 'Такой катеогории не существует' })
    }

    if (cost.user_id !== user_id) {
      return res.status(400).json({ msg: 'Ошибка доступа' })
    }

    const deletedCost = await Cost.findOneAndRemove({ id })

    return res.status(200).json(deletedCost)
  } catch (err) {
    next(err)
  }
}

export default remove
