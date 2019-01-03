const handleErrorsMiddleware = (err, req, res) => {
  res.status(500).json({ msg: 'Internal server error' })
}

export default handleErrorsMiddleware
