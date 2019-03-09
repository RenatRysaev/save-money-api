import mongoose from 'mongoose'
import GroupSchema from './schema'

const Group = mongoose.model('Group', GroupSchema)

export default Group
