import { Router } from 'express'

import userRouter from 'features/user/routes'
import incomeRouter from 'features/income/routes'
import expenseRouter from 'features/expense/routes'

const routersInit = () => {
  const router = Router()

  router.use(userRouter)
  router.use(incomeRouter)
  router.use(expenseRouter)

  return router
}

export default routersInit
