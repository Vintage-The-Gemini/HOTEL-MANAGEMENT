const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(MongoDB Connected: \);
  } catch (error) {
    console.error(Error: \);
    process.exit(1);
  }
};

module.exports = connectDB;

// Initialize the connection
connectDB();
