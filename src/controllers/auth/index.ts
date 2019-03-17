import reg, { validationForReg } from './reg'
import login, { validationForLogin } from './login'
import checkLogin from './checkLogin'

const authController = {
  reg,
  login,
  checkLogin,
  validationForReg,
  validationForLogin,
}

export default authController
