import '@babel/polyfill'
import http from 'http'
import express from 'express'
import socketIO from 'socket.io'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'

import logger from 'root/logger'
import mongoConfig from 'config/mongo'
import passport from 'root/passport'
import MongoManager from 'mongo/MongoManager'
import appRouter from 'routes'
import notFoundMiddleware from 'middleware/notFound'
import handleErrorsMiddleware from 'middleware/handleErrors'

const app = express()
const mongo = new MongoManager(mongoConfig)

app.use(morgan(':method :url :status :response-time ms - :res[content-length]'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(passport.initialize())

app.use('/api', appRouter())
app.use(notFoundMiddleware)
app.use(handleErrorsMiddleware)

const server = http.Server(app)
const io = socketIO(server)

mongo
  .connect()
  .then(() => logger.info('Connected Successfully to MongoDB'))
  .catch(error =>
    logger.info(`An error occurred while connecting to the MongoDB: ${error}`),
  )

io.on('connection', socket => {
  logger.info('socket', socket)
})

const port = process.env.PORT || 8080

server.listen(port, () => {
  logger.info(
    `Server started,
    ---------------------
    PORT:${port},
    ---------------------
    URL: http://localhost:${port},
    ---------------------
    MongoDB: ${mongoConfig.MONGODB_URI}
    ---------------------`,
  )
})
