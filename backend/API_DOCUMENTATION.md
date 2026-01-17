# 📚 Coaching Management System - API Documentation

## 🚀 Swagger Documentation Setup

This project now includes comprehensive Swagger/OpenAPI 3.0 documentation for all API endpoints.

### 📍 Access Documentation

Once the server is running, you can access the interactive API documentation at:

- **Development:** `http://localhost:5010/api-docs`
- **Production:** `https://coaching-management-system-70i3.onrender.com/api-docs`

### 🛠️ Installation

The required Swagger dependencies have been added to `package.json`:

```bash
npm install swagger-jsdoc swagger-ui-express
```

### 📋 Features

#### 🔐 Authentication
- **JWT Bearer Token Authentication** - All protected endpoints require a valid JWT token
- **Role-based Access Control** - Different access levels for Super Admin, Admin, and Student roles

#### 📊 API Coverage
- **Student Management** - Complete CRUD operations for student records
- **Course Management** - Full course lifecycle management
- **Chapter Management** - Detailed chapter and content management
- **Authentication** - Login and token management

#### 🎨 Interactive Features
- **Try It Out** - Test API endpoints directly from the documentation
- **Request/Response Examples** - Comprehensive examples for all endpoints
- **Schema Validation** - Detailed request/response schema definitions
- **Error Handling** - Documented error responses with status codes

### 📖 API Endpoints Overview

#### 🎓 Students (`/student`)
- `POST /student/register` - Register new student
- `POST /student/login` - Student authentication
- `GET /student` - Get all students (with pagination & search)
- `GET /student/:id` - Get single student
- `POST /student/update` - Update student information
- `DELETE /student/:id` - Deactivate student
- `GET /student/profile` - Get current user profile
- `GET /student/stats` - Get student statistics
- `GET /student/qualification` - Get qualification options
- `POST /student/settings` - Update notification settings
- `POST /student/change-password` - Change password

#### 📚 Courses (`/course`)
- `POST /course/addcourse` - Create new course
- `GET /course` - Get all courses (with pagination & search)
- `GET /course/:id` - Get single course
- `POST /course/update` - Update course
- `DELETE /course/:id` - Delete course

#### 📖 Chapters (`/chapter`)
- `POST /chapter/addchapter` - Add new chapter
- `GET /chapter` - Get all chapters (with filtering)
- `GET /chapter/:id` - Get single chapter
- `POST /chapter/update` - Update chapter
- `DELETE /chapter/:id` - Delete chapter

### 🔧 Configuration

The Swagger configuration is located in `/src/config/swagger.js` and includes:

- **API Information** - Title, version, description, contact details
- **Server Configuration** - Development and production server URLs
- **Security Schemes** - JWT Bearer token authentication
- **Schema Definitions** - Complete data models for all entities
- **Response Templates** - Standardized response structures

### 🎯 Usage Examples

#### Authentication
```bash
# Login to get JWT token
curl -X POST http://localhost:3000/student/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@example.com",
    "password": "password123"
  }'
```

#### Using JWT Token
```bash
# Use token in subsequent requests
curl -X GET http://localhost:5010/student/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 📝 Schema Definitions

#### Student Schema
- Complete student profile with validation rules
- Notification preferences
- Role-based access control
- Status tracking (Active, Inactive, Course Completed)

#### Course Schema
- Course title and description
- Creation and update tracking
- Creator information

#### Chapter Schema
- Course association
- Concepts and references arrays
- Detailed content structure

### 🔍 Advanced Features

#### Pagination & Search
Most GET endpoints support:
- `page` - Page number
- `limit` - Items per page
- `search` - Search term

#### Error Handling
Standardized error responses with:
- HTTP status codes
- Error messages
- Validation details

#### Security
- JWT token validation
- Role-based authorization
- Input sanitization
- CORS configuration

### 🚀 Development Tips

1. **Testing APIs** - Use the interactive Swagger UI to test endpoints
2. **Authentication** - Always include JWT token for protected routes
3. **Validation** - Check schema definitions for required fields
4. **Error Handling** - Refer to error response schemas for troubleshooting

### 📞 Support

For API-related questions or issues:
- **Email:** adnanmd2410@gmail.com
- **GitHub:** [mdadnan2](https://github.com/mdadnan2)
- **Documentation:** `/api-docs` endpoint

---

*This documentation is automatically generated from code annotations and stays in sync with the actual API implementation.*