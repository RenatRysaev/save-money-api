import mongoose, { Model } from 'mongoose'
import MODEL_NAMES from 'constants/model_names'
import ExpenseSchema from './schema'

import { IExpense } from './types'

const Expense: Model<IExpense> = mongoose.model(
  MODEL_NAMES.EXPENSE,
  ExpenseSchema,
)

export default Expense
