import express from 'express'

import User from 'models/user'
import auth from 'controllers/auth'

const models = { User }

const routersInit = () => {
  const router = express()

  router.use(auth(models))

  return router
}

export default routersInit
