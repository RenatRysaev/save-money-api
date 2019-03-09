import { Router as router } from 'express'
import passport from 'passport'

import create from './create'
// import list from './list'
import remove from './remove'
import update from './update'
import addUser from './addUser'
import removeUser from './removeUser'

const groupCotroller = {
  create,
  remove,
  update,
  addUser,
  removeUser,
}

export default groupCotroller

const group = models => {
  const api = router()

  api.post(
    '/create',
    passport.authenticate('jwt', { session: false }),
    create(models),
  )

  // api.get('/', passport.authenticate('jwt', { session: false }), list(models))
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

  api.post(
    '/add_user',
    passport.authenticate('jwt', { session: false }),
    addUser(models),
  )

  api.post(
    '/remove_user/:id',
    passport.authenticate('jwt', { session: false }),
    removeUser(models),
  )

  return api
}

// export default group
