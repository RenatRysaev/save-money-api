import { jwtOptions } from 'root/passport'
import pick from 'lodash/pick'

/**
 * @api {post} /check-login User check login
 * @apiName Check login
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiSuccessExample Success-Response:
 *  {
 *    id: '123',
 *    name: 'John'
 *  },
 */

const checkLogin = ({ User }) => async (req, res, next) => {
  try {
    const { id: user_id } = req.user

    const user = await User.findById(user_id)

    res.status(200).json(pick(user, ['id', 'name']))
  } catch (err) {
    next(err)
  }
}

export default checkLogin
