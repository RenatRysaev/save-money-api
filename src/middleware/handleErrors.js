// import logger from 'root/logger'

const handleErrorsMiddleware = (req, res) => {
  // console.error(error)
  res.status(500).json({ error: 'Internal server error' })
}

export default handleErrorsMiddleware
