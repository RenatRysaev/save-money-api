import passport from 'passport'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'

import User from 'models/user'

export const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'super-key',
}

const jwtMiddleware = async (jwtPayload, done) => {
  const { error, user } = await User.findOne({ token: jwtPayload.id })

  if (error) return done(error, false)

  if (!user) return done(null, false)

  return done(null, user)
}

const strategy = new JwtStrategy(jwtOptions, jwtMiddleware)

passport.use(strategy)

export default passport
