import { Router } from 'express'

import authRouter from './auth'
import expenseCategories from './expense_categories'
import plannedExpenses from './planned_expenses'
import factExpenses from './fact_expenses'
import incomeRouter from './income'
import groupRouter from './group'

const routersInit = () => {
  const router = Router()

  router.use(authRouter)
  router.use(expenseCategories)
  router.use(plannedExpenses)
  router.use(factExpenses)
  router.use(incomeRouter)
  router.use(groupRouter)

  return router
}

export default routersInit
