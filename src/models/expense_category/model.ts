import mongoose, { Model } from 'mongoose'
import ExpenseCategorySchema from './schema'

import { IExpenseCategoryModel } from './types'

const ExpenseCategory: Model<IExpenseCategoryModel> = mongoose.model<
  IExpenseCategoryModel
>('ExpenseCategory', ExpenseCategorySchema)

export default ExpenseCategory
