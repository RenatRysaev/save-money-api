import create, { validationForCreate } from './create'
import list from './list'
import remove, { validationForRemove } from './remove'
import update, { validationForUpdate } from './update'

// скормить модель здесь, чтобы не импортировать везде ?

const costsController = {
  create,
  list,
  remove,
  update,
  validationForCreate,
  validationForRemove,
  validationForUpdate,
}

export default costsController
