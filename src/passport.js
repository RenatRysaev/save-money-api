import passport from 'passport'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'

import User from 'models/user'

export const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'super-key',
}

const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, next) => {
  try {
    const user = await User.findOne({ id: payload.id })

    if (!user) {
      return next(null, false)
    }

    return next(null, user)
  } catch (err) {
    next(error, false)
  }
})

passport.use(jwtStrategy)

export default passport
