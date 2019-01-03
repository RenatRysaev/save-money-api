const list = ({ Income }) => async (req, res, next) => {
  try {
    const { id: user_id } = req.user

    const income = await Income.find({ user_id })

    return res.status(200).json(income)
  } catch (err) {
    next(err)
  }
}

export default list
