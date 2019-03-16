import mongoose from 'mongoose'
import FactExpenseSchema from './schema'

const FactExpense = mongoose.model('FactExpense', FactExpenseSchema)

export default FactExpense
