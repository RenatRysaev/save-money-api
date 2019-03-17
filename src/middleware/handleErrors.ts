import logger from 'root/logger'

const handleErrorsMiddleware = (err, req, res) => {
  logger.error(err)
  res.status(500).json({ error: 'Internal server error' })
}

export default handleErrorsMiddleware
