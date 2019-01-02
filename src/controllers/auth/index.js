import { Router as router } from 'express'

import reg from './reg'
import login from './login'

const auth = models => {
  const api = router()

  api.post('/reg', reg(models))
  api.post('/login', login(models))

  return api
}

export default auth
