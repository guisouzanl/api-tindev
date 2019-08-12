import mongoose from 'mongoose';

class Database {
  constructor() {
    this.mongoose();
  }

  mongoose() {
    mongoose.connect(
      'mongodb+srv://omnistack:omnistack@cluster0-abczx.mongodb.net/oministack?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useFindAndModify: true,
      }
    );
  }
}

export default new Database();
