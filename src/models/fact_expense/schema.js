import { Schema } from 'mongoose'

const FactExpenseSchema = new Schema({
  user_id: {
    type: String,
    required: true,
    unique: false,
  },
  categoryId: {
    type: String,
    required: true,
    unique: false,
  },
  name: {
    type: String,
    required: true,
    unique: false,
  },
  sum: {
    type: String,
    required: true,
    unique: false,
  },
  currency: {
    type: String,
    required: true,
    unique: false,
  },
  date: {
    type: String,
    required: true,
    unique: false,
  },
})

export default FactExpenseSchema
