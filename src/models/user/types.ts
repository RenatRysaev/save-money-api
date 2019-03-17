import { Document } from 'mongoose'

export interface IUser extends Document {
  group_id: string
  name: string
  password: string
  comparePassword: (password: String) => Boolean
}
