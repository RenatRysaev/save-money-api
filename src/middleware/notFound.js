const notFoundMiddleware = (req, res) => {
  res.status(404).json({ error: 'Not found.' })
}

export default notFoundMiddleware
