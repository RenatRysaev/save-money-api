import mongoose from 'mongoose'
import CostRecordSchema from './schema'

const CostRecord = mongoose.model('Cost', CostRecordSchema)

export default CostRecord
