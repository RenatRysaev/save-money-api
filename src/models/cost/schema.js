import { Schema } from 'mongoose'

const CostSchema = new Schema({
  user_id: {
    type: String,
    required: true,
    unique: false,
  },
  group_id: {
    type: String,
    required: false,
    false: false,
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
  description: {
    type: String,
    required: false,
    unique: false,
  },
})

export default CostSchema
