import express from 'express'

import User from 'models/user'
import Cost from 'models/cost'

import auth from 'controllers/auth'
import costs from 'controllers/costs'

const models = { User, Cost }

const routersInit = () => {
  const router = express()

  router.use(auth(models))
  router.use('/costs', costs(models))

  return router
}

export default routersInit
