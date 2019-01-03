import mongoose from 'mongoose'
import IncomeSchema from './schema'

const Income = mongoose.model('Income', IncomeSchema)

export default Income
