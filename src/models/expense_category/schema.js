import { Schema } from 'mongoose'

const ExpenseCategorySchema = new Schema({
  user_id: {
    type: String,
    required: false,
    unique: false,
  },
  name: {
    type: String,
    required: true,
    unique: false,
  },
})

export default ExpenseCategorySchema
