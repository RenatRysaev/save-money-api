import create from './create'
import list from './list'
import remove from './remove'
import update from './update'

// скормить модель здесь, чтобы не импортировать везде ?

const costsController = {
  create,
  list,
  remove,
  update,
}

export default costsController
