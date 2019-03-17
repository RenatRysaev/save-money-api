import { Schema } from 'mongoose'

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  users_id: {
    type: [String],
    required: false,
    unique: false,
  },
  creator_user_id: {
    type: String,
    required: true,
    unique: false,
  },
})

export default GroupSchema
