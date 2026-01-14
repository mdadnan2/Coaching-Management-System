# 📋 Quick Reference Card

## 🚀 Common Commands

### Development
```bash
# Start everything
npm run dev

# Start backend only
npm run dev:backend

# Start frontend only
npm run dev:frontend

# Install all dependencies
npm run install:all

# Clean everything
npm run clean
```

### Production
```bash
# Backend
cd Coaching_Management-Backend
NODE_ENV=production npm start

# Frontend build
cd coaching-management frontend
npm run build
```

---

## 📂 File Locations

### Environment Files
```
Backend:
  .env.development          (local dev - gitignored)
  .env.production          (production - gitignored)
  .env.example             (template - committed)

Frontend:
  .env.development          (local dev - gitignored)
  .env.production          (production - gitignored)
  .env.example             (template - committed)
```

### Configuration
```
Backend:
  config/env.js            (environment loader)
  config/database.js       (DB connection)
  config/cors.js           (CORS setup)

Frontend:
  src/config/env.js        (environment config)
  src/api/client.js        (axios instance)
  src/api/endpoints.js     (API endpoints)
```

---

## 🔐 Environment Variables

### Backend (.env.development)
```env
NODE_ENV=development
PORT=5010
DB_CONNECTION_STRING=mongodb://...
JWT_SECRET=your-secret
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.development)
```env
REACT_APP_API_BASE_URL=http://localhost:5010
REACT_APP_ENV=development
```

---

## 🌐 URLs

### Local Development
- Frontend: http://localhost:3000
- Backend: http://localhost:5010
- Health: http://localhost:5010/health

### Production (Update with your domains)
- Frontend: https://yourdomain.com
- Backend: https://api.yourdomain.com

---

## 🔧 Configuration Access

### Backend
```javascript
const config = require('./config/env');

config.port              // 5010
config.db.connectionString
config.jwt.secret
config.cors.origin
```

### Frontend
```javascript
import config from './config/env';

config.apiBaseUrl        // http://localhost:5010
config.environment       // development
config.storage.tokenKey  // auth_token
```

---

## 🔌 API Integration

### Making API Calls
```javascript
import apiClient from '../api/client';
import API_ENDPOINTS from '../api/endpoints';

// GET request
const response = await apiClient.get(API_ENDPOINTS.students.base);

// POST request
const response = await apiClient.post(API_ENDPOINTS.auth.login, {
  email: 'user@example.com',
  password: 'password'
});

// With ID
const response = await apiClient.get(API_ENDPOINTS.students.byId(123));
```

### Token Management
```javascript
// Store token
localStorage.setItem('coaching_app_auth_token', token);

// Get token (automatic in interceptor)
const token = localStorage.getItem('coaching_app_auth_token');

// Clear token
localStorage.removeItem('coaching_app_auth_token');
```

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port is in use
netstat -ano | findstr :5010

# Check MongoDB connection
# Verify .env.development exists
# Check NODE_ENV is set
```

### Frontend can't reach backend
```bash
# Check backend is running
curl http://localhost:5010/health

# Verify REACT_APP_API_BASE_URL
echo %REACT_APP_API_BASE_URL%

# Check CORS settings in backend
```

### CORS errors
```
Backend: CORS_ORIGIN=http://localhost:3000
Frontend: REACT_APP_API_BASE_URL=http://localhost:5010
```

### Environment variables not loading
```bash
# Restart servers after .env changes
# React variables MUST start with REACT_APP_
# Check .env file is in correct directory
```

---

## 📦 Package Management

### Update Dependencies
```bash
# Check outdated
npm outdated

# Update all
npm update

# Update specific
npm install package@latest
```

### Add New Package
```bash
# Backend
cd Coaching_Management-Backend
npm install package-name

# Frontend
cd coaching-management frontend
npm install package-name
```

---

## 🔒 Security

### Generate Strong Secrets
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Check for Secrets in Code
```bash
# Before commit
git diff | grep -i "secret\|password\|key"
```

---

## 📊 Monitoring

### Check Logs
```bash
# Backend (if using PM2)
pm2 logs coaching-backend

# Frontend (browser console)
F12 → Console tab
```

### Health Check
```bash
curl http://localhost:5010/health
```

---

## 🚢 Deployment

### Pre-Deploy Checklist
- [ ] Tests passing
- [ ] Environment variables set
- [ ] Strong production secrets
- [ ] CORS configured
- [ ] Database backed up

### Deploy Commands
```bash
# Heroku
git push heroku main

# Vercel
vercel --prod

# Manual
npm run build
# Upload build/ folder
```

---

## 📚 Documentation

- **Setup**: SETUP_GUIDE.md
- **Architecture**: ARCHITECTURE_GUIDE.md
- **Deployment**: DEPLOYMENT_GUIDE.md
- **This file**: QUICK_REFERENCE.md

---

## 🆘 Getting Help

1. Check documentation files
2. Review error messages carefully
3. Check environment variables
4. Verify services are running
5. Check CORS configuration
6. Review logs

---

## ✅ Daily Workflow

```bash
# Morning
git pull
npm run dev

# During development
# Make changes
# Test locally
# Commit frequently

# Before leaving
git add .
git commit -m "feat: description"
git push

# Stop servers
Ctrl+C
```
