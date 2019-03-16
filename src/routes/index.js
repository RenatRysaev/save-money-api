import { Router } from 'express'

import authRouter from './auth'
import costCategoriesRouter from './cost-categories'
import incomeRouter from './income'
import groupRouter from './group'
import costRecords from './cost_records'

const routersInit = () => {
  const router = new Router()

  router.use(authRouter)
  router.use(costCategoriesRouter)
  router.use(incomeRouter)
  router.use(groupRouter)
  router.use(costRecords)

  return router
}

export default routersInit
