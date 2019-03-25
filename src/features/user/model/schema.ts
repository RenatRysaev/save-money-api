import { Schema } from 'mongoose'

const UserSchema = new Schema({
  _id: Schema.Types.ObjectId,
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
  name: {
    type: String,
    required: true,
    unique: false,
  },
})

export default UserSchema
