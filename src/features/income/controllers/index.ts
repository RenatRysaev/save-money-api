import create, { validationForCreate } from './create'
import get from './get'
import remove, { validationForRemove } from './remove'
import update, { validationForUpdate } from './update'

const incomeController = {
  create,
  get,
  remove,
  update,
  validationForCreate,
  validationForRemove,
  validationForUpdate,
}

export default incomeController
