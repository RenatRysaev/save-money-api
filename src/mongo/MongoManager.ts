import mongoose from 'mongoose'

import { IMongoManager } from './types'

class MongoManager implements IMongoManager {
  private config: { MONGODB_URI: string }

  constructor(config) {
    this.config = config
  }

  getMongoUrl() {
    return this.config.MONGODB_URI
  }

  connect() {
    return mongoose.connect(
      this.getMongoUrl(),
      {
        useNewUrlParser: true,
        useCreateIndex: true,
      },
    )
  }
}

export default MongoManager
