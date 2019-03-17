import mongoose, { Model } from 'mongoose'
import IncomeSchema from './schema'

import { IIncome } from './types'

const Income: Model<IIncome> = mongoose.model('Income', IncomeSchema)

export default Income
