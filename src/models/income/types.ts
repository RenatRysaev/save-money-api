import { Document } from 'mongoose'

export interface IIncome extends Document {
  user_id: String
  group_id: String
  name: String
  sum: Number
}
