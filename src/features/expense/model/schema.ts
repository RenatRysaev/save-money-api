import { Schema } from 'mongoose'
import MODEL_NAMES from 'constants/model_names'
import AVAILABLE_CURRENCY from 'constants/available_currency'

const ExpenseSchema = new Schema({
  _id: Schema.Types.ObjectId,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: MODEL_NAMES.USER,
  },
  type: {
    type: String,
    required: true,
    unique: false,
    enum: ['Planned', 'Actual'],
  },
  kind: {
    type: String,
    required: true,
    unique: false,
    enum: ['Permanent', 'One-time'],
  },
  currency: {
    type: String,
    required: true,
    unique: false,
    enum: AVAILABLE_CURRENCY,
  },
  name: {
    type: String,
    required: true,
    unique: false,
  },
  sum: {
    type: Number,
    required: true,
    unique: false,
  },
  date: {
    type: Date,
    required: false,
    unique: false,
  },
})

export default ExpenseSchema
