import debug from 'debug'

const logger = {
  info: debug('INFO'),
  debug: debug('DEBUG'),
  error: debug('ERROR'),
}

export default logger
