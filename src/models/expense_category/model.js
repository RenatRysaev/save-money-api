import mongoose from 'mongoose'
import ExpenseCategorySchema from './schema'

const ExpenseCategory = mongoose.model('ExpenseCategory', ExpenseCategorySchema)

export default ExpenseCategory
