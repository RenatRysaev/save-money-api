import { transports, createLogger, format } from 'winston'
import { resolve } from 'path'

const logger = createLogger({
  level: 'info',
  format: format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),
    new transports.File({ filename: resolve('error.log'), level: 'error' }),
  ],
})

export default logger
