import passport from 'passport'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import mongoose from 'mongoose'

import User from 'features/user/model'

export const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'super-key',
}

const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, next) => {
  console.log(
    'user id',
    payload.id,
    mongoose.Types.ObjectId.isValid(payload.id),
  )
  try {
    const user = await User.findById(payload.id)

    if (!user) {
      return next(null, false)
    }

    return next(null, user)
  } catch (err) {
    next(err, false)
  }
})

passport.use(jwtStrategy)

export default passport
