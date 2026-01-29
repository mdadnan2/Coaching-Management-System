const path = require('path');

// Load environment-specific config
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
require('dotenv').config({ path: path.join(__dirname, `../../${envFile}`) });

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5010,
  apiVersion: process.env.API_VERSION || 'v1',
  
  db: {
    connectionString: process.env.DB_CONNECTION_STRING,
    name: process.env.DB_NAME || 'coaching_management'
  },
  
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d'
  },
  
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: process.env.CORS_CREDENTIALS === 'true'
  },
  
  security: {
    bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10,
    rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
    rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
  },
  
  logging: {
    level: process.env.LOG_LEVEL || 'debug',
    morganFormat: process.env.MORGAN_FORMAT || 'dev'
  },
  
  frontend: {
    url: process.env.FRONTEND_URL || 'http://localhost:3000'
  }
};
