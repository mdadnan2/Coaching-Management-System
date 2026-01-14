# 🏗️ Full-Stack Architecture Guide

## ✅ Best Practices Checklist

### Environment Configuration
- [x] Separate .env files for development and production
- [x] .env.example templates committed to git
- [x] Actual .env files in .gitignore
- [x] Centralized config modules (backend/config/, frontend/src/config/)
- [x] Type-safe environment variable access
- [x] Default fallback values for non-critical configs

### Security
- [ ] Strong JWT secrets (use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- [x] CORS properly configured
- [x] Environment-specific security settings
- [ ] Rate limiting implemented
- [ ] Input validation on all endpoints
- [ ] SQL/NoSQL injection prevention
- [ ] XSS protection
- [ ] HTTPS in production
- [ ] Helmet.js for security headers

### Code Organization
- [x] Feature-based folder structure
- [x] Separation of concerns (routes, controllers, models)
- [x] Centralized configuration
- [x] Reusable utilities and helpers
- [x] Consistent naming conventions
- [ ] Code documentation
- [ ] API documentation (Swagger/OpenAPI)

### API Integration
- [x] Centralized axios instance
- [x] Request/response interceptors
- [x] Token management
- [x] Error handling
- [x] API endpoint constants
- [ ] Request retry logic
- [ ] Loading states
- [ ] Error boundaries

### Development Workflow
- [x] Unified install scripts
- [x] Unified dev scripts
- [x] Hot reload for development
- [x] Environment-specific builds
- [x] Proper .gitignore files

### Performance
- [ ] Database indexing
- [ ] Query optimization
- [ ] Response caching
- [ ] Image optimization
- [ ] Code splitting (React.lazy)
- [ ] Bundle size optimization
- [ ] Compression middleware

### Testing
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] Test coverage > 80%

### Deployment
- [ ] CI/CD pipeline
- [ ] Docker containers
- [ ] Health check endpoints
- [ ] Logging and monitoring
- [ ] Error tracking (Sentry)
- [ ] Backup strategy

---

## 🎯 Environment Variable Naming Conventions

### Backend (Node.js)
```
CATEGORY_SPECIFIC_NAME=value

Examples:
DB_CONNECTION_STRING
JWT_SECRET
CORS_ORIGIN
RATE_LIMIT_MAX_REQUESTS
LOG_LEVEL
```

### Frontend (React)
```
REACT_APP_CATEGORY_SPECIFIC_NAME=value

Examples:
REACT_APP_API_BASE_URL
REACT_APP_ENV
REACT_APP_ENABLE_ANALYTICS
```

**Rules:**
- Use SCREAMING_SNAKE_CASE
- Prefix React variables with REACT_APP_
- Group by category (DB_, JWT_, CORS_, etc.)
- Be descriptive but concise
- Never include actual secrets in variable names

---

## 🔐 Secrets Management

### Development
- Store in `.env.development` (gitignored)
- Share template via `.env.example`
- Document required variables in README

### Production
- Use environment variables from hosting platform
- AWS: Parameter Store / Secrets Manager
- Heroku: Config Vars
- Vercel/Netlify: Environment Variables UI
- Never hardcode secrets
- Rotate secrets regularly

### Generating Strong Secrets
```bash
# JWT Secret (32 bytes)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or use online tools (for non-production only)
# https://www.uuidgenerator.net/
```

---

## 🔄 Frontend ↔ Backend Integration

### 1. API Base URL Handling

**Backend:**
```javascript
// config/env.js
cors: {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
}
```

**Frontend:**
```javascript
// config/env.js
apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5010'

// api/client.js
const apiClient = axios.create({
  baseURL: config.apiBaseUrl
});
```

### 2. CORS Configuration

**Backend (config/cors.js):**
```javascript
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = config.cors.origin.split(',');
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
```

**Frontend:**
```javascript
// Include credentials in requests
apiClient.defaults.withCredentials = true;
```

### 3. Authentication Flow

**Login:**
```
1. User submits credentials → Frontend
2. POST /auth/login → Backend
3. Backend validates → Returns JWT token
4. Frontend stores token in localStorage
5. Frontend adds token to all subsequent requests
```

**Token Refresh:**
```
1. API returns 401 Unauthorized
2. Interceptor catches error
3. Attempts token refresh with refresh token
4. If successful: retry original request
5. If failed: redirect to login
```

**Implementation (frontend/src/api/client.js):**
```javascript
apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      // Refresh token logic
      const newToken = await refreshToken();
      error.config.headers.Authorization = `Bearer ${newToken}`;
      return apiClient(error.config);
    }
    return Promise.reject(error);
  }
);
```

---

## ⚠️ Common Mistakes to Avoid

### 1. Environment Variables
❌ Committing .env files to git
❌ Hardcoding API URLs in code
❌ Using development secrets in production
❌ Not providing .env.example template
✅ Use .gitignore for .env files
✅ Use config modules to access env vars
✅ Generate strong production secrets
✅ Document all required variables

### 2. CORS Issues
❌ Using `cors()` without options (allows all origins)
❌ Not including credentials
❌ Mismatched frontend/backend URLs
✅ Explicitly set allowed origins
✅ Enable credentials when needed
✅ Test with actual domain names

### 3. Authentication
❌ Storing tokens in cookies without httpOnly
❌ Not handling token expiration
❌ Sending tokens in URL parameters
❌ Not validating tokens on backend
✅ Use localStorage or httpOnly cookies
✅ Implement token refresh
✅ Use Authorization header
✅ Validate and verify all tokens

### 4. API Integration
❌ Repeating axios configuration everywhere
❌ Not handling errors globally
❌ Hardcoding API endpoints
❌ Not showing loading states
✅ Create centralized axios instance
✅ Use interceptors for common logic
✅ Define endpoints as constants
✅ Implement proper error handling

### 5. Code Organization
❌ Mixing configuration with business logic
❌ Inconsistent folder structure
❌ No separation of concerns
❌ Duplicate code
✅ Centralize configuration
✅ Follow consistent patterns
✅ Separate routes/controllers/models
✅ Create reusable utilities

### 6. Database
❌ Exposing connection strings in code
❌ Not handling connection errors
❌ No database indexing
❌ Not validating input
✅ Use environment variables
✅ Implement proper error handling
✅ Add indexes for frequently queried fields
✅ Validate all user input

### 7. Security
❌ Weak JWT secrets
❌ No rate limiting
❌ Exposing error details in production
❌ Not sanitizing user input
✅ Use strong, random secrets
✅ Implement rate limiting
✅ Generic error messages in production
✅ Validate and sanitize all input

### 8. Git & Deployment
❌ Committing node_modules
❌ Committing build artifacts
❌ No .gitignore file
❌ Committing sensitive data
✅ Proper .gitignore configuration
✅ Build on deployment server
✅ Use .gitignore templates
✅ Scan for secrets before commit

---

## 🚀 Optimization Strategies

### Backend Performance
1. **Database Optimization**
   - Add indexes on frequently queried fields
   - Use projection to limit returned fields
   - Implement pagination
   - Use aggregation pipelines

2. **Caching**
   - Redis for session storage
   - Cache frequently accessed data
   - Set appropriate TTL values

3. **Compression**
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

4. **Rate Limiting**
   ```javascript
   const rateLimit = require('express-rate-limit');
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000,
     max: 100
   });
   app.use('/api/', limiter);
   ```

### Frontend Performance
1. **Code Splitting**
   ```javascript
   const Students = React.lazy(() => import('./features/students'));
   ```

2. **Memoization**
   ```javascript
   const MemoizedComponent = React.memo(Component);
   const memoizedValue = useMemo(() => compute(a, b), [a, b]);
   ```

3. **Bundle Optimization**
   - Analyze bundle size: `npm run build -- --stats`
   - Remove unused dependencies
   - Use tree-shaking

4. **Image Optimization**
   - Use WebP format
   - Lazy load images
   - Implement responsive images

---

## 📊 Monitoring & Logging

### Backend Logging
```javascript
// Use Winston or Pino
const winston = require('winston');

const logger = winston.createLogger({
  level: config.logging.level,
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### Error Tracking
- Sentry for error monitoring
- LogRocket for session replay
- Google Analytics for user behavior

### Health Checks
```javascript
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date(),
    uptime: process.uptime(),
    environment: config.env
  });
});
```

---

## 🐳 Docker Setup (Optional)

### docker-compose.yml
```yaml
version: '3.8'
services:
  backend:
    build: ./Coaching_Management-Backend
    ports:
      - "5010:5010"
    environment:
      - NODE_ENV=development
    volumes:
      - ./Coaching_Management-Backend:/app
    depends_on:
      - mongodb

  frontend:
    build: ./coaching-management frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_BASE_URL=http://localhost:5010
    volumes:
      - ./coaching-management frontend:/app

  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
```

---

## 📚 Additional Resources

- [Express Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [React Best Practices](https://react.dev/learn/thinking-in-react)
- [MongoDB Performance](https://www.mongodb.com/docs/manual/administration/analyzing-mongodb-performance/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [OWASP Security](https://owasp.org/www-project-top-ten/)
