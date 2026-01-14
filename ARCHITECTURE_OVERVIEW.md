# 🏗️ Architecture Overview

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     COACHING MANAGEMENT APP                  │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────┐         ┌──────────────────────┐
│   FRONTEND (React)   │◄───────►│  BACKEND (Node.js)   │
│   Port: 3000         │  HTTP   │  Port: 5010          │
└──────────────────────┘         └──────────────────────┘
                                          │
                                          ▼
                                 ┌─────────────────┐
                                 │  MongoDB Atlas  │
                                 └─────────────────┘
```

## 📁 Project Structure

```
coaching-management-app/
│
├── 📂 Coaching_Management-Backend/
│   ├── 📂 src/
│   │   ├── 📂 config/              # Configuration files
│   │   │   ├── env.js              # Environment loader
│   │   │   ├── database.js         # DB connection
│   │   │   └── cors.js             # CORS setup
│   │   │
│   │   ├── 📂 constants/           # App constants
│   │   ├── 📂 controllers/         # Business logic
│   │   ├── 📂 helpers/             # Utility functions
│   │   ├── 📂 middleware/          # Auth & validation
│   │   ├── 📂 models/              # MongoDB schemas
│   │   ├── 📂 routes/              # API routes
│   │   ├── 📂 utils/               # Helper utilities
│   │   └── app.js                  # Express app
│   │
│   ├── server.js                   # Entry point
│   ├── package.json                # Dependencies
│   ├── .env.development            # Dev config
│   ├── .env.production             # Prod config
│   └── .env.example                # Template
│
├── 📂 coaching-management frontend/
│   ├── 📂 src/
│   │   ├── 📂 api/                 # NEW: API layer
│   │   │   ├── client.js           # Axios instance
│   │   │   └── endpoints.js        # API endpoints
│   │   │
│   │   ├── 📂 config/              # NEW: Config
│   │   │   └── env.js              # Environment
│   │   │
│   │   ├── 📂 apis/                # Legacy (updated)
│   │   ├── 📂 components/          # React components
│   │   ├── 📂 Pages/               # Page components
│   │   ├── 📂 store/               # Redux store
│   │   ├── 📂 reducers/            # Redux reducers
│   │   └── App.js                  # Main app
│   │
│   ├── package.json
│   ├── .env.development
│   ├── .env.production
│   └── .env.example
│
├── 📂 Documentation/
│   ├── README.md                   # Project overview
│   ├── START_HERE.md               # ⭐ Begin here
│   ├── SETUP_GUIDE.md              # Detailed setup
│   ├── ARCHITECTURE_GUIDE.md       # Best practices
│   ├── DEPLOYMENT_GUIDE.md         # Deploy guide
│   ├── QUICK_REFERENCE.md          # Commands
│   └── MIGRATION_COMPLETE.md       # Changes log
│
├── package.json                    # Root scripts
├── .gitignore                      # Git exclusions
└── .env.example                    # Root template
```

## 🔄 Request Flow

```
1. USER ACTION
   │
   ▼
2. REACT COMPONENT
   │
   ▼
3. API CLIENT (src/api/client.js)
   │
   ├─► Add Authorization header
   ├─► Set base URL
   └─► Handle errors
   │
   ▼
4. BACKEND ROUTE (src/routes/)
   │
   ▼
5. MIDDLEWARE (src/middleware/)
   │
   ├─► Verify JWT token
   └─► Check authorization
   │
   ▼
6. CONTROLLER (src/controllers/)
   │
   ├─► Validate input
   ├─► Business logic
   └─► Call model
   │
   ▼
7. MODEL (src/models/)
   │
   └─► MongoDB query
   │
   ▼
8. RESPONSE
   │
   └─► Back to frontend
```

## 🔐 Authentication Flow

```
┌─────────┐
│  LOGIN  │
└────┬────┘
     │
     ▼
┌──────────────────┐
│ POST /student/   │
│      login       │
└────┬─────────────┘
     │
     ▼
┌──────────────────┐
│ Verify Password  │
└────┬─────────────┘
     │
     ▼
┌──────────────────┐
│ Generate JWT     │
└────┬─────────────┘
     │
     ▼
┌──────────────────┐
│ Store in         │
│ localStorage     │
└────┬─────────────┘
     │
     ▼
┌──────────────────┐
│ Auto-attach to   │
│ all requests     │
└──────────────────┘
```

## 🌐 API Endpoints

### Students
```
POST   /student/register      # Create student
GET    /student               # Get all students
GET    /student/:id           # Get single student
POST   /student/update        # Update student
DELETE /student/:id           # Delete student
POST   /student/login         # Login
GET    /student/stats         # Statistics
GET    /student/qualification # Qualifications
```

### Courses
```
POST   /course/addcourse      # Create course
GET    /course                # Get all courses
GET    /course/:id            # Get single course
POST   /course/update         # Update course
DELETE /course/:id            # Delete course
```

### Chapters
```
POST   /chapter/addchapter    # Create chapter
GET    /chapter               # Get all chapters
GET    /chapter/:id           # Get single chapter
POST   /chapter/update        # Update chapter
DELETE /chapter/:id           # Delete chapter
```

## 🔧 Configuration Files

### Backend (.env.development)
```env
NODE_ENV=development
PORT=5010
DB_CONNECTION_STRING=mongodb+srv://...
JWT_SECRET=your-secret
JWT_REFRESH_SECRET=your-refresh-secret
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.development)
```env
REACT_APP_API_BASE_URL=http://localhost:5010
REACT_APP_ENV=development
REACT_APP_ENABLE_DEBUG=true
```

## 📦 Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Auth:** JWT (jsonwebtoken)
- **Security:** crypto-js, CORS
- **Logging:** Morgan
- **Validation:** Validator

### Frontend
- **Library:** React 18
- **State:** Redux Toolkit + Redux Persist
- **UI:** Material-UI (MUI)
- **HTTP:** Axios
- **Routing:** React Router
- **Date:** Day.js

## 🚀 Deployment Architecture

```
┌─────────────────────────────────────────────┐
│              PRODUCTION                      │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────────┐      ┌──────────────┐   │
│  │   Vercel     │      │   Heroku     │   │
│  │  (Frontend)  │◄────►│  (Backend)   │   │
│  │              │ HTTPS │              │   │
│  └──────────────┘      └──────┬───────┘   │
│                                │            │
│                                ▼            │
│                        ┌──────────────┐    │
│                        │ MongoDB      │    │
│                        │ Atlas        │    │
│                        └──────────────┘    │
│                                             │
└─────────────────────────────────────────────┘
```

## 📊 Data Models

### Student
```javascript
{
  studentId: String,
  email: String,
  password: String (encrypted),
  phoneNumber: String,
  address: String,
  dateOfBirth: Date,
  dateOfJoining: Date,
  gender: String,
  aadharCard: String,
  panCard: String,
  selectCourse: String,
  highestQualification: String,
  role: String,
  recStatus: String,
  createdBy: String,
  createdDate: Date
}
```

### Course
```javascript
{
  courseName: String,
  courseCode: String,
  duration: String,
  fees: Number,
  description: String,
  createdBy: String,
  createdDate: Date
}
```

### Chapter
```javascript
{
  chapterName: String,
  courseId: String,
  description: String,
  duration: String,
  createdBy: String,
  createdDate: Date
}
```

## 🎯 Key Features

✅ **Authentication & Authorization**
- JWT-based authentication
- Role-based access control
- Secure password encryption

✅ **Student Management**
- CRUD operations
- Status tracking (Active/Inactive/Completed)
- Qualification management

✅ **Course Management**
- Course creation and management
- Chapter organization
- Course-student mapping

✅ **Dashboard & Analytics**
- Student statistics
- Course enrollment tracking
- Status reports

✅ **Security**
- CORS protection
- JWT token validation
- Input sanitization
- Environment-based configs

## 🔄 Development Workflow

```
1. Pull latest code
   ↓
2. Update .env files
   ↓
3. npm run dev
   ↓
4. Make changes
   ↓
5. Test locally
   ↓
6. Commit & push
   ↓
7. Deploy
```

## 📈 Performance Optimizations

- **Backend:**
  - Database indexing
  - Query optimization
  - Response caching
  - Compression middleware

- **Frontend:**
  - Code splitting
  - Lazy loading
  - Memoization
  - Bundle optimization

## 🛡️ Security Measures

- Environment-based configuration
- Strong JWT secrets
- Password encryption
- CORS protection
- Input validation
- Rate limiting (recommended)
- HTTPS in production

---

**For detailed instructions, start with `START_HERE.md`**
