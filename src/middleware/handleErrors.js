import logger from 'root/logger'

const handleErrorsMiddleware = (err, req, res) => {
  logger.error(err)
  res.status(500).json({ msg: 'Internal server error' })
}

export default handleErrorsMiddleware
