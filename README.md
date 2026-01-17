# 🎓 Coaching Management System – Full-Stack Application

> *A comprehensive SaaS-style platform for efficient coaching institute operations management*

## 🌐 Live Demo

**Live URL:** [https://tiffin360.vercel.app/](https://tiffin360.vercel.app/)

---

## 📋 Project Overview

The **Coaching Management System** is a real-world, production-ready SaaS application designed to streamline coaching institute operations. Built with modern web technologies, it serves multiple user roles including **Super Admin**, **Admin**, and **Student**, providing a comprehensive solution for educational institution management.

This system emphasizes **scalability**, **maintainability**, and **clean architecture** principles, making it suitable for both small coaching centers and large educational institutions.

---

## ⚡ Key Features

### 🔧 Backend Architecture (Core Focus)

- **🔐 Secure Authentication & Authorization System**
  - JWT-based authentication with token expiration
  - Role-Based Access Control (Super Admin, Admin, Student)
  - Password encryption using industry-standard algorithms
  - Session management and security middleware

- **🛡️ Robust API Infrastructure**
  - Well-structured RESTful API endpoints
  - Comprehensive input validation and sanitization
  - Centralized error handling and logging
  - Environment-based configuration management

- **📊 Complete CRUD Operations**
  - Student management (registration, profiles, status tracking)
  - Course management with detailed curriculum structure
  - Chapter-wise content organization
  - Advanced filtering, pagination, and search capabilities

- **🏗️ Clean Architecture & Best Practices**
  - Modular service-based backend architecture
  - Clear separation of concerns (Controllers, Services, Models)
  - Structured middleware pipeline
  - Comprehensive data validation and error responses

- **📧 Advanced Features**
  - Email notification system with customizable templates
  - Student status tracking (Active, Inactive, Course Completed)
  - Notification preferences management
  - Health check endpoints for monitoring

### 🎨 Frontend Capabilities

- **📱 Responsive & Modern UI**
  - Material-UI components with custom theming
  - Dark/Light mode support with smooth transitions
  - Mobile-first responsive design
  - Intuitive user experience across all devices

- **🔄 Seamless API Integration**
  - Axios-based HTTP client with interceptors
  - Redux Toolkit for state management
  - Real-time form validation and error handling
  - Loading states and skeleton components

- **👥 Role-Based Dashboards**
  - Customized interfaces for different user roles
  - Interactive data visualization with charts
  - Multi-step forms with progress indicators
  - Advanced data tables with sorting and filtering

---

## 🏛️ High-Level System Architecture

```
┌─────────────────┐    HTTP/REST API    ┌─────────────────┐
│                 │◄──────────────────►│                 │
│   Frontend      │                    │   Backend       │
│   (React SPA)   │                    │   (Node.js)     │
│                 │                    │                 │
└─────────────────┘                    └─────────────────┘
                                                │
                                                │
                                                ▼
                                       ┌─────────────────┐
                                       │                 │
                                       │    Database     │
                                       │   (MongoDB)     │
                                       │                 │
                                       └─────────────────┘
```

The frontend communicates with the backend through well-defined REST APIs, while the backend handles all business logic, authentication, and data processing. The database layer ensures structured and efficient data storage with proper indexing and relationships.

---

## 📁 Backend Folder Structure

```
backend/
├── src/
│   ├── controllers/          # Request handlers and business logic
│   │   ├── student_controller.js
│   │   ├── course_controller.js
│   │   └── chapter_controller.js
│   ├── models/              # Database schemas and models
│   │   ├── student.js
│   │   ├── course.js
│   │   └── chapter.js
│   ├── routes/              # API route definitions
│   │   ├── index.js
│   │   ├── student.js
│   │   ├── course.js
│   │   └── chapter.js
│   ├── middleware/          # Authentication and validation
│   │   ├── auth.js
│   │   └── authMiddleware.js
│   ├── services/            # External service integrations
│   │   └── emailService.js
│   ├── config/              # Configuration management
│   │   ├── database.js
│   │   ├── cors.js
│   │   └── env.js
│   ├── constants/           # Application constants
│   │   ├── fields.constants.js
│   │   ├── message.constants.js
│   │   ├── status.constants.js
│   │   └── qualifications.json
│   ├── helpers/             # Utility functions
│   │   ├── responseStructure.js
│   │   └── security.js
│   ├── utils/               # Common utilities
│   │   └── objectDestructure.js
│   └── app.js               # Application entry point
├── scripts/                 # Database seeding scripts
│   ├── addSuperAdmin.js
│   └── addDummyUser.js
├── .env.example
├── package.json
└── server.js
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Git

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/mdadnan2/Coaching-Management-System
cd coaching-management-app/backend

# Install dependencies
npm install

# Environment configuration
cp .env.example .env.development
# Configure your environment variables

# Start development server
npm run dev
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env.development

# Start development server
npm start
```

---

## 🔌 Sample API Endpoints

### Authentication
```http
POST /student/login          # User authentication
```

### Student Management
```http
GET    /student              # Get all students
POST   /student              # Register new student
GET    /student/:id          # Get single student
PUT    /student/:id          # Update student
DELETE /student/:id          # Deactivate student
GET    /student/qualification # Get qualification options
```

### Course Management
```http
GET    /course               # Get all courses
POST   /course               # Create new course
GET    /course/:id           # Get single course
PUT    /course/:id           # Update course
DELETE /course/:id           # Delete course
```

### Chapter Management
```http
GET    /chapter              # Get all chapters
POST   /chapter              # Create new chapter
GET    /chapter/:id          # Get single chapter
PUT    /chapter/:id          # Update chapter
DELETE /chapter/:id          # Delete chapter
```

---

## 🛠️ Technology Stack

### Backend
- **Runtime:** Node.js with Express.js framework
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** Crypto-js for encryption, CORS middleware
- **Email:** Nodemailer for transactional emails
- **Validation:** Custom validation with Mongoose schemas
- **Logging:** Morgan for HTTP request logging

### Frontend
- **Framework:** React 18 with functional components
- **State Management:** Redux Toolkit with Redux Persist
- **UI Library:** Material-UI (MUI) with custom theming
- **HTTP Client:** Axios with interceptors
- **Routing:** React Router DOM v6
- **Animations:** Framer Motion
- **Notifications:** React Hot Toast

---

## 🔮 Future Enhancements

- **💳 Payment Integration**
  - Fee collection and payment tracking
  - Multiple payment gateway support
  - Automated invoice generation

- **🔔 Advanced Notifications System**
  - Real-time push notifications
  - SMS integration for important updates
  - Email campaign management

- **📊 Analytics Dashboard**
  - Student performance analytics
  - Course completion tracking
  - Revenue and enrollment insights

- **☁️ Cloud Optimization**
  - AWS/Azure deployment optimization
  - CDN integration for static assets
  - Database performance tuning

- **⚡ Performance Improvements**
  - API response caching
  - Database query optimization
  - Frontend code splitting and lazy loading

---

## 👨‍💻 Developer

**Backend Development Focus:** This project showcases expertise in building scalable, secure, and maintainable backend systems with modern Node.js practices, comprehensive API design, and robust data management solutions.

---

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 📞 Contact

**Mohammad Adnan**

- 📧 Email: [adnanmd2410@gmail.com](mailto:adnanmd2410@gmail.com)
- 💼 LinkedIn: [mohammadadnan01](https://linkedin.com/in/mohammadadnan01)
- 🐱 GitHub: [mdadnan2](https://github.com/mdadnan2)
- 📱 Phone: +91 9356576610
- 📍 Location: Pune, Maharashtra, India

---

## 👨💻 Developer

**Backend Development Focus:** This project showcases expertise in building scalable, secure, and maintainable backend systems with modern Node.js practices, comprehensive API design, and robust data management solutions.

---

⭐ **If you found this project inspiring, please give it a star!**

*Made with ❤️ by Mohammad Adnan*