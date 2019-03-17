import { Document } from 'mongoose'

export interface IPlannedExpense extends Document {
  user_id: String
  category_id: String
  group_id?: String
  name: String
  sum: Number
  description?: String
  currency: String
}
