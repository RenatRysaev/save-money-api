import mongoose, { Model } from 'mongoose'
import bcrypt from 'bcrypt'
import UserSchema from './schema'

import { IUser } from './types'

UserSchema.pre<IUser>('save', async function(next) {
  const self = this
  try {
    const hashedPassword = await bcrypt.hash(self.password, 10)
    self.password = hashedPassword

    next()
  } catch (err) {
    next(err)
  }
})

UserSchema.methods.comparePassword = async function(password: String) {
  return new Promise(async (resolve, reject) => {
    try {
      const isMatch = await bcrypt.compare(password, this.password)
      resolve(isMatch)
    } catch (err) {
      reject(err)
    }
  })
}

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema)

export default User
