import { Schema } from 'mongoose'

const UserSchema = new Schema({
  groupId: {
    type: String,
    required: false,
    unique: false,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
})

export default UserSchema
