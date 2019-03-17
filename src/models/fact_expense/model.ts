import mongoose, { Model } from 'mongoose'
import FactExpenseSchema from './schema'

import { IFactExpense } from './types'

const FactExpense: Model<IFactExpense> = mongoose.model(
  'FactExpense',
  FactExpenseSchema,
)

export default FactExpense
