import create, { validationForCreate } from './create'
import remove, { validationForRemove } from './remove'
import update, { validationForUpdate } from './update'
import addUser, { validationForAddUser } from './addUser'
import removeUser, { validationForRemoveUser } from './removeUser'

const groupCotroller = {
  create,
  remove,
  update,
  addUser,
  removeUser,
  validationForAddUser,
  validationForRemoveUser,
  validationForCreate,
  validationForUpdate,
  validationForRemove,
}

export default groupCotroller
