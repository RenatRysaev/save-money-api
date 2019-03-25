import { Document } from 'mongoose'

export interface IUser extends Document {
  login: string
  name: string
  password: string
  comparePassword: (password: string) => boolean
}
