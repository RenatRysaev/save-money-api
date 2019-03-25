import create, { validationForCreate } from './create'
import get from './get'
import update, { validationForUpdate } from './update'
import remove, { validationForRemove } from './remove'

const controller = {
  create,
  get,
  update,
  remove,
  validationForCreate,
  validationForUpdate,
  validationForRemove,
}

export default controller
