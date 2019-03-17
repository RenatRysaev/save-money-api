import passport from 'passport'
import handleValidationErrors from 'middleware/validation'

export const withProtect = () => [
  passport.authenticate('jwt', { session: false }),
]

export const withValidationErrorsHandler = () => [handleValidationErrors]
