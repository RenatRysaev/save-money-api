import mongoose from 'mongoose'
import PlannedExpenseSchema from './schema'

const PlannedExpense = mongoose.model('PlannedExpense', PlannedExpenseSchema)

export default PlannedExpense
