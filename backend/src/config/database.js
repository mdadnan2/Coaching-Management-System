require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log(`✅ Database connected: ${process.env.DB_NAME}`);
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('⚠️  Database disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Database error:', err);
});

module.exports = connectDB;
