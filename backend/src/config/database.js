const mongoose = require('mongoose');
const config = require('./env');

const connectDB = async () => {
  try {
    await mongoose.connect(config.db.connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`✅ Database connected: ${config.db.name}`);
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
