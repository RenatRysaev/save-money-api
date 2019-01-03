import { Router as router } from 'express'
import passport from 'passport'

import create from './create'
import list from './list'
import remove from './remove'
import update from './update'

const income = models => {
  const api = router()

  // TODO: сделать декоратор для защищенных методов
  api.post(
    '/create',
    passport.authenticate('jwt', { session: false }),
    create(models),
  )
  api.get('/', passport.authenticate('jwt', { session: false }), list(models))
  api.post(
    '/remove/:id',
    passport.authenticate('jwt', { session: false }),
    remove(models),
  )
  api.post(
    '/update/:id',
    passport.authenticate('jwt', { session: false }),
    update(models),
  )

  return api
}

export default income
