import passport from 'passport'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'

import User from 'models/user/index'

export const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'super-key',
}

const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, next) => {
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
