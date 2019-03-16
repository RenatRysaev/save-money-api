import { Router } from 'express'

import authRouter from './auth'
import costCategoriesRouter from './planned_expenses'
import incomeRouter from './income'
import groupRouter from './group'
import costRecords from './fact_expenses'

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
