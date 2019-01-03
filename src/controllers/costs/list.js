const list = ({ Cost }) => async (req, res, next) => {
  try {
    const { user_id } = req.body

    if (!user_id) {
      return res.status(400).json({ msg: 'invalid req data' })
    }

    const costs = await Cost.find({ user_id })

    return res.status(200).json(costs)
  } catch (err) {
    next(err)
  }
}

export default list
