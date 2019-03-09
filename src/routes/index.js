import { Router } from 'express'

import authRouter from './auth'
import costsRouter from './costs'
import incomeRouter from './income'
import groupRouter from './group'

const routersInit = () => {
  const router = new Router()

  router.use(authRouter)
  router.use(costsRouter)
  router.use(incomeRouter)
  router.use(groupRouter)

  return router
}

export default routersInit
