require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const buildConnectionString = () => {
  const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
  const credentials = DB_USERNAME
    ? `${encodeURIComponent(DB_USERNAME)}:${encodeURIComponent(DB_PASSWORD)}@`
    : '';
  return `mongodb://${credentials}${DB_HOST || 'localhost'}:${DB_PORT || 27017}/${DB_NAME || 'coaching_management'}`;
};

module.exports = {
  port: process.env.PORT || 5010,
  nodeEnv: process.env.NODE_ENV || 'development',
  db: {
    connectionString: buildConnectionString(),
    name: process.env.DB_NAME || 'coaching_management',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: process.env.CORS_CREDENTIALS === 'true',
  },
  security: {
    bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10,
  },
  frontend: {
    url: process.env.FRONTEND_URL || 'http://localhost:3000',
  },
  logging: {
    morganFormat: process.env.MORGAN_FORMAT || 'dev',
  },
  env: process.env.NODE_ENV || 'development',
};
