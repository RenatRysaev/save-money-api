import { Document } from 'mongoose'

export interface IExpense extends Document {
  user_id: string
  kind: string
  type: string
  currency: string
  name: string
  sum: number
  date: string
}
