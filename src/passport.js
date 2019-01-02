import passport from 'passport'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'

import User from 'models/user'

export const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'super-key',
}

const jwtMiddleware = async (jwtPayload, done) => {
  console.log('jwtPayload', jwtPayload)
  try {
    const user = await User.findOne({ id: jwtPayload.id })

    if (!user) {
      return done(null, false)
    }

    return done(null, user)
  } catch (err) {
    done(error, false)
  }
}

const jwtStrategy = new JwtStrategy(jwtOptions, jwtMiddleware)

passport.use(jwtStrategy)

export default passport
