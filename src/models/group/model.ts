import mongoose, { Model } from 'mongoose'
import GroupSchema from './schema'

import { IGroup } from './types'

const Group: Model<IGroup> = mongoose.model('Group', GroupSchema)

export default Group
