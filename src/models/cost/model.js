import mongoose from 'mongoose'
import CostSchema from './schema'

const Cost = mongoose.model('Cost', CostSchema)

export default Cost
