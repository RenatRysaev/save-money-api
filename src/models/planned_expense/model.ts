import mongoose, { Model } from 'mongoose'
import PlannedExpenseSchema from './schema'

import { IPlannedExpense } from './types'

const PlannedExpense: Model<IPlannedExpense> = mongoose.model(
  'PlannedExpense',
  PlannedExpenseSchema,
)

export default PlannedExpense
