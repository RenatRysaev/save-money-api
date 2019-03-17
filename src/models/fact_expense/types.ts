import { Document } from 'mongoose'

export interface IFactExpense extends Document {
  user_id: String
  category_id: String
  name: String
  sum: Number
  currency: String
  date: String
}
