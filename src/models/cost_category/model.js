import mongoose from 'mongoose'
import CostCategorySchema from './schema'

const CostCategory = mongoose.model('Cost', CostCategorySchema)

export default CostCategory
