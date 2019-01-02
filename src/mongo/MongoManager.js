import mongoose from 'mongoose'

class MongoManager {
  constructor(config) {
    this._config = config
  }

  getMongoUrl() {
    return this._config.MONGODB_URI
  }

  connect() {
    return mongoose.connect(
      this.getMongoUrl(),
      {
        useNewUrlParser: true,
        // useCreateIndex: true,
      },
    )
  }
}

export default MongoManager
