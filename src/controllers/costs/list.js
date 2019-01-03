const list = ({ Cost }) => async (req, res, next) => {
  try {
    const { id: user_id } = req.user

    const costs = await Cost.find({ user_id })

    return res.status(200).json(costs)
  } catch (err) {
    next(err)
  }
}

export default list
