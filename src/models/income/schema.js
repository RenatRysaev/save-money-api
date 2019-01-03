import { Schema } from 'mongoose'

const IncomeSchema = new Schema({
  user_id: {
    type: String,
    required: true,
    unique: false,
  },
  id: {
    type: String,
    required: true,
    unique: true,
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
})

export default IncomeSchema
