import registration, { validationForRegistration } from './registration'
import login, { validationForLogin } from './login'
import checkLogin from './check_login'

const authController = {
  registration,
  login,
  checkLogin,
  validationForRegistration,
  validationForLogin,
}

export default authController
