const mongoose = require('mongoose');
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cowboys-in-a-ranch', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      });
      console.log('MongoDB connected!');
    } catch (error) {
      console.error(error.message);
      process.exit(1); // Exit process with failure
    }
  };
  
 module.exports = connectDB;