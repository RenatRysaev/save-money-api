import { jwtOptions } from 'root/passport'

/**
 * @api {post} /check-login User check login
 * @apiName Check login
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} authorization token
 *
 * @apiSuccessExample Success-Response:
 *    {
 *        id: 'some id',
 *        name: 'some name'
 *    },
 */

const checkLogin = ({ User }) => async (req, res, next) => {
  try {
    const { id: user_id } = req.user

    const user = await User.findOne({ id: user_id })

    res.status(200).json({ id: user.id, name: user.name })
  } catch (err) {
    next(err)
  }
}

export default checkLogin
