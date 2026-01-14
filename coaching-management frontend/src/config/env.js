const config = {
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5010',
  apiVersion: process.env.REACT_APP_API_VERSION || 'v1',
  apiTimeout: parseInt(process.env.REACT_APP_API_TIMEOUT) || 30000,
  
  appName: process.env.REACT_APP_NAME || 'Coaching Management System',
  environment: process.env.REACT_APP_ENV || 'development',
  
  features: {
    analytics: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
    debug: process.env.REACT_APP_ENABLE_DEBUG === 'true'
  },
  
  storage: {
    prefix: process.env.REACT_APP_STORAGE_PREFIX || 'coaching_app_',
    tokenKey: process.env.REACT_APP_TOKEN_KEY || 'auth_token',
    refreshTokenKey: process.env.REACT_APP_REFRESH_TOKEN_KEY || 'refresh_token'
  }
};

export default config;
