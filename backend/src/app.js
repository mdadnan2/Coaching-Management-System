const express = require("express");
const morgan = require('morgan');
const bodyParser = require("body-parser");
const config = require("./config/env");
const connectDB = require("./config/database");
const corsMiddleware = require("./config/cors");
const { setupRouters } = require("./routes/index");
const { specs, swaggerUi } = require('./config/swagger');

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

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  explorer: true,
  customCss: `
    .swagger-ui .topbar { 
      display: block !important; 
      background-color: #2c3e50; 
      position: relative;
    } 
    .swagger-ui .topbar .download-url-wrapper { display: none; }
    .theme-toggle {
      position: absolute;
      top: 15px;
      right: 20px;
      background: #34495e;
      border: none;
      color: white;
      padding: 8px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
    }
    .theme-toggle:hover {
      background: #4a6741;
    }
  `,
  customSiteTitle: 'Coaching Management API Documentation',
  swaggerOptions: {
    onComplete: function() {
      const topbar = document.querySelector('.swagger-ui .topbar');
      if (topbar && !document.querySelector('.theme-toggle')) {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'theme-toggle';
        toggleBtn.innerHTML = '🌙 Dark';
        toggleBtn.onclick = function() {
          document.body.classList.toggle('dark-theme');
          toggleBtn.innerHTML = document.body.classList.contains('dark-theme') ? '☀️ Light' : '🌙 Dark';
          if (document.body.classList.contains('dark-theme')) {
            document.querySelector('.swagger-ui').style.filter = 'invert(1) hue-rotate(180deg)';
            document.querySelector('.swagger-ui .topbar').style.filter = 'invert(1) hue-rotate(180deg)';
          } else {
            document.querySelector('.swagger-ui').style.filter = 'none';
            document.querySelector('.swagger-ui .topbar').style.filter = 'none';
          }
        };
        topbar.appendChild(toggleBtn);
      }
    }
  }
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    environment: config.env,
    timestamp: new Date().toISOString(),
    documentation: '/api-docs'
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
  console.log(`📚 Swagger Docs: http://localhost:${config.port}/api-docs`);
});

module.exports = app;
