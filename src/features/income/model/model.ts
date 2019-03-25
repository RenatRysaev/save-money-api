import mongoose, { Model } from 'mongoose'
import MODEL_NAMES from 'constants/model_names'
import IncomeSchema from './schema'

import { IIncome } from './types'

const Income: Model<IIncome> = mongoose.model(MODEL_NAMES.INCOME, IncomeSchema)

export default Income
