import { Document } from 'mongoose'

export interface IGroup extends Document {
  users_id: Array<String>
  name: String
  creator_user_id: String
}
