# 🚀 Step-by-Step Setup Guide

## Phase 1: Initial Setup (5 minutes)

### Step 1: Install Root Dependencies
```bash
cd c:\Data\Projects\Coaching-Management-App
npm install
```

### Step 2: Install Backend Dependencies
```bash
cd Coaching_Management-Backend
npm install
```

### Step 3: Install Frontend Dependencies
```bash
cd ..\coaching-management frontend
npm install
```

---

## Phase 2: Environment Configuration (10 minutes)

### Step 4: Configure Backend Environment

**Already created:** `.env.development` and `.env.production`

**Action Required:**
1. Open `Coaching_Management-Backend\.env.development`
2. Update `DB_CONNECTION_STRING` with your MongoDB connection
3. Generate strong JWT secrets:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
4. Replace `JWT_SECRET` and `JWT_REFRESH_SECRET` with generated values

**Example:**
```env
DB_CONNECTION_STRING=mongodb+srv://username:password@cluster0.mongodb.net/coaching_management
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
JWT_REFRESH_SECRET=z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4
```

### Step 5: Configure Frontend Environment

**Already created:** `.env.development` and `.env.production`

**Action Required:**
1. Open `coaching-management frontend\.env.development`
2. Verify `REACT_APP_API_BASE_URL=http://localhost:5010`
3. No changes needed for local development

---

## Phase 3: Update Backend Code (15 minutes)

### Step 6: Backend Already Updated ✅

The following files have been created/updated:
- ✅ `config/env.js` - Centralized configuration
- ✅ `config/database.js` - Database connection
- ✅ `config/cors.js` - CORS configuration
- ✅ `app.js` - Refactored with new config
- ✅ `package.json` - Added dev script with nodemon

**No manual changes needed!**

---

## Phase 4: Update Frontend Code (10 minutes)

### Step 7: Update Frontend API Calls

**Files created:**
- ✅ `src/config/env.js` - Environment config
- ✅ `src/api/client.js` - Axios instance with interceptors
- ✅ `src/api/endpoints.js` - API endpoint constants

### Step 8: Update Existing API Calls (Manual)

**Find all axios calls in your code and replace with:**

**Before:**
```javascript
import axios from 'axios';

axios.get('http://localhost:5010/students')
```

**After:**
```javascript
import apiClient from '../api/client';
import API_ENDPOINTS from '../api/endpoints';

apiClient.get(API_ENDPOINTS.students.base)
```

**Common locations to update:**
- `src/apis/` folder
- Redux actions/thunks
- Component API calls

---

## Phase 5: Testing (10 minutes)

### Step 9: Test Backend
```bash
cd Coaching_Management-Backend
npm run dev
```

**Expected output:**
```
✅ Database connected: coaching_management
🚀 Server running on port 5010 in development mode
📍 API: http://localhost:5010
```

**Test health endpoint:**
```bash
curl http://localhost:5010/health
```

### Step 10: Test Frontend
```bash
cd ..\coaching-management frontend
npm start
```

**Expected:**
- Opens browser at http://localhost:3000
- No console errors
- Can make API calls to backend

### Step 11: Test Full Integration
```bash
# From root directory
npm run dev
```

**This runs both frontend and backend simultaneously!**

---

## Phase 6: Git Setup (5 minutes)

### Step 12: Verify .gitignore

**Check these files are NOT tracked:**
```bash
git status
```

**Should NOT see:**
- `.env.development`
- `.env.production`
- `node_modules/`
- `build/`

**Should see (to commit):**
- `.env.example`
- `config/` folder
- Updated `package.json`
- `.gitignore`

### Step 13: Initial Commit
```bash
git add .
git commit -m "feat: setup production-ready architecture with env config"
git push
```

---

## Phase 7: Production Deployment (When Ready)

### Step 14: Backend Deployment

**Environment Variables to Set:**
```env
NODE_ENV=production
PORT=5010
DB_CONNECTION_STRING=<production-mongodb-url>
JWT_SECRET=<strong-secret>
JWT_REFRESH_SECRET=<strong-secret>
CORS_ORIGIN=https://yourdomain.com
```

**Deploy Command:**
```bash
npm install --production
NODE_ENV=production npm start
```

### Step 15: Frontend Deployment

**Environment Variables to Set:**
```env
REACT_APP_API_BASE_URL=https://api.yourdomain.com
REACT_APP_ENV=production
```

**Build Command:**
```bash
npm run build
```

**Serve the `build/` folder with:**
- Vercel
- Netlify
- AWS S3 + CloudFront
- Nginx

---

## 🎯 Quick Reference Commands

### Development
```bash
# Install everything
npm run install:all

# Run both (from root)
npm run dev

# Run separately
npm run dev:backend
npm run dev:frontend
```

### Production
```bash
# Backend
cd Coaching_Management-Backend
NODE_ENV=production npm start

# Frontend
cd coaching-management frontend
npm run build
```

### Maintenance
```bash
# Clean all node_modules
npm run clean

# Reinstall
npm run install:all
```

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Health endpoint responds: http://localhost:5010/health
- [ ] Frontend can call backend APIs
- [ ] CORS works (no console errors)
- [ ] Authentication flow works (if implemented)
- [ ] .env files are gitignored
- [ ] .env.example files are committed
- [ ] Both apps run with `npm run dev`

---

## 🆘 Troubleshooting

### Backend won't start
```bash
# Check MongoDB connection
# Verify .env.development exists
# Check port 5010 is not in use
netstat -ano | findstr :5010
```

### Frontend can't reach backend
```bash
# Verify REACT_APP_API_BASE_URL in .env.development
# Check CORS_ORIGIN in backend .env.development
# Ensure backend is running
```

### CORS errors
```bash
# Backend .env.development
CORS_ORIGIN=http://localhost:3000

# Frontend .env.development
REACT_APP_API_BASE_URL=http://localhost:5010
```

### Environment variables not loading
```bash
# Backend: Restart server after .env changes
# Frontend: Restart dev server (Ctrl+C, npm start)
# React: Variables MUST start with REACT_APP_
```

---

## 📞 Next Steps

1. ✅ Complete Phase 1-6 setup
2. Update existing API calls to use new client
3. Implement token refresh logic
4. Add error boundaries in React
5. Set up logging and monitoring
6. Write tests
7. Configure CI/CD
8. Deploy to production

**Refer to ARCHITECTURE_GUIDE.md for detailed best practices!**
