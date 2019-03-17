import create, { validationForCreate } from './create'
import list from './list'
import remove, { validationForRemove } from './remove'
import update, { validationForUpdate } from './update'

const incomeController = {
  create,
  list,
  remove,
  update,
  validationForCreate,
  validationForRemove,
  validationForUpdate,
}

export default incomeController
