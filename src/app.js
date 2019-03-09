import '@babel/polyfill'
import http from 'http'
import express from 'express'
import socketIO from 'socket.io'
import cors from 'cors'
import bodyParser from 'body-parser'

import config from 'root/config'
import passport from 'root/passport'
import MongoManager from 'mongo/MongoManager'
import api from 'api'
import handleErrorsMiddleware from 'middleware/handleErrors'

const app = express()
const mongo = new MongoManager(config)

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use('/api/v1', api())
app.use(handleErrorsMiddleware)

const server = http.Server(app)
const io = socketIO(server)

mongo
  .connect()
  .then(() => console.log('Connected Successfully to MongoDB'))
  .catch(error =>
    console.log(`An error occurred while connecting to the MongoDB: ${error}`),
  )

io.on('connection', socket => {
  console.log('socket', socket)
})

const port = process.env.PORT || 8080

server.listen(port, () => {
  console.log(
    `Server started,
    ---------------------
    PORT:${port},
    ---------------------
    URL: http://localhost:${port},
    ---------------------
    MongoDB: ${config.MONGODB_URI}
    ---------------------`,
  )
})
