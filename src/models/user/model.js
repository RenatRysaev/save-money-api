import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import UserSchema from './schema'

UserSchema.pre('save', async function(next) {
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10)
    this.password = hashedPassword

    next()
  } catch (err) {
    next(err)
  }
})

UserSchema.methods.comparePassword = async function(password) {
  return new Promise(async (resolve, reject) => {
    try {
      const isMatch = await bcrypt.compare(password, this.password)
      resolve(isMatch)
    } catch (err) {
      reject(err)
    }
  })
}

const User = mongoose.model('User', UserSchema)

export default User
