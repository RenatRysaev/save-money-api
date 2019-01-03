import express from 'express'

import User from 'models/user'
import Cost from 'models/cost'
import Income from 'models/income'

import auth from 'controllers/auth'
import costs from 'controllers/costs'
import income from 'controllers/income'

const models = { User, Cost, Income }

const routersInit = () => {
  const router = express()

  router.use(auth(models))
  router.use('/costs', costs(models))
  router.use('/income', income(models))

  return router
}

export default routersInit
