import { Document } from 'mongoose'

export interface IExpenseCategory {
  user_id: String
  name: String
}

export interface IExpenseCategoryModel extends Document, IExpenseCategory {}
