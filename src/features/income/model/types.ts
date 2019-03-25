import { Document } from 'mongoose'

export interface IIncome extends Document {
  name: string
  sum: number
  user_id: string
  currency: string
}
