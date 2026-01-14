const express = require("express");
const morgan = require('morgan');
const bodyParser = require("body-parser");
const config = require("./config/env");
const connectDB = require("./config/database");
const corsMiddleware = require("./config/cors");
const { setupRouters } = require("./routes/index");

const app = express();

// Database connection
connectDB();

// Logging middleware
app.use(morgan(config.logging.morganFormat));

// CORS middleware
app.use(corsMiddleware);

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    environment: config.env,
    timestamp: new Date().toISOString() 
  });
});

// Setup routes
setupRouters(app);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'URL not found',
    path: req.originalUrl
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: config.env === 'development' ? err.message : 'Internal server error',
    ...(config.env === 'development' && { stack: err.stack })
  });
});

// Start server
app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port} in ${config.env} mode`);
  console.log(`📍 API: http://localhost:${config.port}`);
});

module.exports = app;
