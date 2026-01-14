# 🚢 Deployment Guide

## Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Environment variables documented
- [ ] Strong production secrets generated
- [ ] Database backup strategy in place
- [ ] CORS configured for production domain
- [ ] HTTPS enabled
- [ ] Error tracking configured (Sentry)
- [ ] Logging configured
- [ ] Health check endpoint working

---

## Backend Deployment Options

### Option 1: Heroku

**1. Install Heroku CLI**
```bash
npm install -g heroku
heroku login
```

**2. Create App**
```bash
cd Coaching_Management-Backend
heroku create your-app-name-backend
```

**3. Set Environment Variables**
```bash
heroku config:set NODE_ENV=production
heroku config:set DB_CONNECTION_STRING="mongodb+srv://..."
heroku config:set JWT_SECRET="your-secret"
heroku config:set JWT_REFRESH_SECRET="your-refresh-secret"
heroku config:set CORS_ORIGIN="https://your-frontend.com"
```

**4. Deploy**
```bash
git push heroku main
```

### Option 2: AWS EC2

**1. Launch EC2 Instance**
- Ubuntu 22.04 LTS
- t2.micro (free tier)
- Security group: Allow ports 22, 80, 443, 5010

**2. SSH and Setup**
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone repo
git clone your-repo-url
cd Coaching_Management-Backend
npm install --production
```

**3. Configure Environment**
```bash
nano .env.production
# Add all production variables
```

**4. Start with PM2**
```bash
pm2 start app.js --name coaching-backend
pm2 startup
pm2 save
```

**5. Setup Nginx Reverse Proxy**
```bash
sudo apt install nginx

sudo nano /etc/nginx/sites-available/default
```

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5010;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo nginx -t
sudo systemctl restart nginx
```

### Option 3: Railway

**1. Install Railway CLI**
```bash
npm install -g @railway/cli
railway login
```

**2. Initialize**
```bash
cd Coaching_Management-Backend
railway init
```

**3. Set Variables**
```bash
railway variables set NODE_ENV=production
railway variables set DB_CONNECTION_STRING="..."
railway variables set JWT_SECRET="..."
```

**4. Deploy**
```bash
railway up
```

---

## Frontend Deployment Options

### Option 1: Vercel (Recommended)

**1. Install Vercel CLI**
```bash
npm install -g vercel
```

**2. Deploy**
```bash
cd coaching-management frontend
vercel
```

**3. Set Environment Variables**
- Go to Vercel Dashboard
- Project Settings → Environment Variables
- Add:
  - `REACT_APP_API_BASE_URL=https://your-backend.com`
  - `REACT_APP_ENV=production`

**4. Redeploy**
```bash
vercel --prod
```

### Option 2: Netlify

**1. Build**
```bash
cd coaching-management frontend
npm run build
```

**2. Deploy via Netlify CLI**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=build
```

**3. Environment Variables**
- Netlify Dashboard → Site Settings → Environment Variables
- Add all REACT_APP_* variables

### Option 3: AWS S3 + CloudFront

**1. Build**
```bash
npm run build
```

**2. Create S3 Bucket**
```bash
aws s3 mb s3://your-bucket-name
aws s3 sync build/ s3://your-bucket-name
```

**3. Configure Static Website Hosting**
- Enable static website hosting
- Set index.html as index document

**4. Create CloudFront Distribution**
- Origin: S3 bucket
- Enable HTTPS
- Set custom domain

---

## Database Deployment

### MongoDB Atlas (Recommended)

**1. Create Cluster**
- Go to mongodb.com/cloud/atlas
- Create free cluster
- Choose region close to your backend

**2. Configure Network Access**
- Add IP: 0.0.0.0/0 (or specific IPs)

**3. Create Database User**
- Username: your-app-user
- Password: strong-password

**4. Get Connection String**
```
mongodb+srv://username:password@cluster0.mongodb.net/coaching_management
```

**5. Update Backend .env.production**
```env
DB_CONNECTION_STRING=mongodb+srv://...
```

---

## SSL/HTTPS Setup

### Using Let's Encrypt (Free)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
sudo certbot renew --dry-run
```

---

## Monitoring & Logging

### Setup Sentry

**1. Create Account**
- Go to sentry.io
- Create project

**2. Backend Integration**
```bash
npm install @sentry/node
```

```javascript
// app.js
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: config.env
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
```

**3. Frontend Integration**
```bash
npm install @sentry/react
```

```javascript
// index.js
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.REACT_APP_ENV
});
```

---

## CI/CD Pipeline

### GitHub Actions

**Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Deploy Backend
        run: |
          cd Coaching_Management-Backend
          npm install
          # Add deployment commands

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - name: Build and Deploy
        run: |
          cd coaching-management frontend
          npm install
          npm run build
          # Add deployment commands
```

---

## Post-Deployment

### 1. Verify Deployment
```bash
# Backend health check
curl https://api.yourdomain.com/health

# Frontend
curl https://yourdomain.com
```

### 2. Monitor Logs
```bash
# Heroku
heroku logs --tail

# PM2
pm2 logs coaching-backend

# Railway
railway logs
```

### 3. Setup Alerts
- Uptime monitoring (UptimeRobot)
- Error tracking (Sentry)
- Performance monitoring (New Relic)

### 4. Backup Strategy
- Database: Daily automated backups
- Code: Git repository
- Environment variables: Secure vault

---

## Rollback Strategy

### Heroku
```bash
heroku releases
heroku rollback v123
```

### PM2
```bash
pm2 stop coaching-backend
git checkout previous-commit
npm install
pm2 restart coaching-backend
```

### Vercel
```bash
vercel rollback
```

---

## Cost Estimation

### Free Tier Options
- **Backend**: Railway/Heroku free tier
- **Frontend**: Vercel/Netlify free tier
- **Database**: MongoDB Atlas free tier (512MB)
- **Total**: $0/month

### Production Scale
- **Backend**: AWS EC2 t3.small ($15/month)
- **Frontend**: Vercel Pro ($20/month)
- **Database**: MongoDB Atlas M10 ($57/month)
- **CDN**: CloudFront ($5-20/month)
- **Total**: ~$100-120/month

---

## Security Hardening

### Backend
```javascript
// Install helmet
npm install helmet

// app.js
const helmet = require('helmet');
app.use(helmet());

// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);
```

### Environment Variables
- Never commit .env files
- Use secrets management (AWS Secrets Manager)
- Rotate secrets regularly
- Use different secrets per environment

### Database
- Enable authentication
- Use connection string with credentials
- Whitelist IP addresses
- Enable encryption at rest

---

## Performance Optimization

### Backend
- Enable compression
- Implement caching (Redis)
- Database indexing
- Connection pooling

### Frontend
- Enable CDN
- Compress assets
- Lazy loading
- Code splitting

---

## Maintenance

### Regular Tasks
- [ ] Update dependencies monthly
- [ ] Review logs weekly
- [ ] Check error rates daily
- [ ] Backup verification weekly
- [ ] Security patches immediately
- [ ] Performance monitoring continuous

### Update Process
```bash
# Check outdated packages
npm outdated

# Update safely
npm update

# Test thoroughly
npm test

# Deploy
git push
```
