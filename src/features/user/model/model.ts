import mongoose, { Model } from 'mongoose'
import bcrypt from 'bcrypt'
import MODEL_NAMES from 'constants/model_names'
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

UserSchema.methods.comparePassword = async function(password: string) {
  return new Promise(async (resolve, reject) => {
    console.log('password', password)
    console.log('this.password', this.password)
    try {
      const isMatch = await bcrypt.compare(password, this.password)
      resolve(isMatch)
    } catch (err) {
      reject(err)
    }
  })
}

const User: Model<IUser> = mongoose.model(MODEL_NAMES.USER, UserSchema)

export default User
