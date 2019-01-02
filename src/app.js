import '@babel/polyfill'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import config from './config'
import passport from './passport'
import MongoManager from 'mongo/MongoManager'
import api from 'api'

const app = express()
const mongo = new MongoManager(config)

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use('/api/v1', api())

mongo
  .connect()
  .then(() => console.log('Connected Successfully to MongoDB'))
  .catch(error =>
    console.log(`An error occurred while connecting to the MongoDB: ${error}`),
  )

app.get('/', (req, res) => res.send('Hello World with Express'))

const port = process.env.PORT || 8080

app.listen(port, () => {
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
