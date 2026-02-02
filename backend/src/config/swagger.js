const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const config = require('./env');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Coaching Management System API',
      version: '1.0.0',
      description: 'A comprehensive SaaS-style platform for efficient coaching institute operations management',
      contact: {
        name: 'Mohammad Adnan',
        email: 'adnanmd2410@gmail.com',
        url: 'https://github.com/mdadnan2'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
        description: 'Development server'
      },
      {
        url: 'https://coaching360.vercel.app',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Student: {
          type: 'object',
          required: ['studentname', 'studentId', 'gender', 'phoneNumber', 'address', 'dateOfBirth', 'dateOfJoining', 'email', 'password', 'highestQualification', 'createdBy', 'createdDate'],
          properties: {
            _id: { type: 'string', description: 'Auto-generated MongoDB ObjectId', example: '507f1f77bcf86cd799439011' },
            studentname: { type: 'string', description: 'Full name of the student', example: 'John Doe' },
            studentId: { type: 'string', minLength: 8, maxLength: 8, description: 'Unique 8-character student ID', example: 'STU12345' },
            gender: { type: 'string', enum: ['Male', 'Female', 'Other'], description: 'Gender of the student', example: 'Male' },
            phoneNumber: { type: 'string', minLength: 10, maxLength: 10, description: 'Phone number (10 digits)', example: '9876543210' },
            address: { type: 'string', description: 'Residential address', example: '123 Main Street, City, State' },
            dateOfBirth: { type: 'string', format: 'date', description: 'Date of birth', example: '1995-06-15' },
            dateOfJoining: { type: 'string', format: 'date', description: 'Date of joining the institute', example: '2024-01-15' },
            email: { type: 'string', format: 'email', description: 'Email address', example: 'john.doe@example.com' },
            password: { type: 'string', minLength: 8, description: 'Password (min 8 characters)', example: 'password123' },
            aadharCard: { type: 'string', pattern: '^\\d{12}$', description: 'Aadhar card number (12 digits)', example: '123456789012' },
            panCard: { type: 'string', pattern: '^[A-Z]{5}[0-9]{4}[A-Z]{1}$', description: 'PAN card number', example: 'ABCDE1234F' },
            highestQualification: { type: 'string', enum: ['ssc', 'hsc', 'bachelors', 'masters', 'phd'], description: 'Highest educational qualification', example: 'bachelors' },
            selectCourse: { type: 'string', description: 'Selected course ID', example: '507f1f77bcf86cd799439012' },
            role: { type: 'string', enum: ['super_admin', 'admin', 'student'], default: 'student', description: 'User role', example: 'student' },
            createdBy: { type: 'string', description: 'ID of user who created this record', example: '507f1f77bcf86cd799439013' },
            createdDate: { type: 'string', format: 'date-time', description: 'Record creation date', example: '2024-01-15T10:30:00Z' },
            updatedBy: { type: 'string', description: 'ID of user who last updated this record', example: '507f1f77bcf86cd799439013' },
            updatedDate: { type: 'string', format: 'date-time', description: 'Last update date', example: '2024-01-20T14:45:00Z' },
            recStatus: { type: 'string', enum: ['active', 'In_Active', 'courseCompleted'], default: 'active', description: 'Record status', example: 'active' },
            notificationSettings: {
              type: 'object',
              properties: {
                email: { type: 'boolean', default: true, example: true },
                push: { type: 'boolean', default: true, example: false }
              }
            }
          }
        },
        Course: {
          type: 'object',
          required: ['title', 'description', 'createdBy', 'createdDate'],
          properties: {
            _id: { type: 'string', description: 'Auto-generated MongoDB ObjectId', example: '507f1f77bcf86cd799439012' },
            title: { type: 'string', description: 'Course title', example: 'Advanced Mathematics' },
            description: { type: 'string', description: 'Course description', example: 'Comprehensive course covering calculus, algebra, and statistics' },
            createdBy: { type: 'string', description: 'ID of user who created this course', example: '507f1f77bcf86cd799439013' },
            createdDate: { type: 'string', format: 'date-time', description: 'Course creation date', example: '2024-01-10T09:00:00Z' },
            updatedBy: { type: 'string', description: 'ID of user who last updated this course', example: '507f1f77bcf86cd799439013' },
            updatedDate: { type: 'string', format: 'date-time', description: 'Last update date', example: '2024-01-15T11:30:00Z' }
          }
        },
        Chapter: {
          type: 'object',
          required: ['courseId', 'title', 'description', 'concepts', 'references', 'createdBy', 'createdDate'],
          properties: {
            _id: { type: 'string', description: 'Auto-generated MongoDB ObjectId', example: '507f1f77bcf86cd799439014' },
            courseId: { type: 'string', description: 'Reference to Course ObjectId', example: '507f1f77bcf86cd799439012' },
            title: { type: 'string', description: 'Chapter title', example: 'Introduction to Calculus' },
            description: { type: 'string', description: 'Chapter description', example: 'Basic concepts of limits, derivatives, and integrals' },
            concepts: { type: 'array', items: { type: 'string' }, description: 'List of concepts covered', example: ['Limits', 'Derivatives', 'Chain Rule', 'Integration'] },
            references: { type: 'array', items: { type: 'string' }, description: 'Reference materials', example: ['Calculus by Stewart - Chapter 2', 'Khan Academy - Limits'] },
            createdBy: { type: 'string', description: 'ID of user who created this chapter', example: '507f1f77bcf86cd799439013' },
            createdDate: { type: 'string', format: 'date-time', description: 'Chapter creation date', example: '2024-01-12T14:20:00Z' },
            updatedBy: { type: 'string', description: 'ID of user who last updated this chapter', example: '507f1f77bcf86cd799439013' },
            updatedDate: { type: 'string', format: 'date-time', description: 'Last update date', example: '2024-01-18T16:45:00Z' }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email', description: 'User email', example: 'demo@test.com' },
            password: { type: 'string', description: 'User password', example: 'demo1234' }
          }
        },
        LoginResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            token: { type: 'string', description: 'JWT token' },
            user: { $ref: '#/components/schemas/Student' }
          }
        },
        ApiResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: { type: 'object' }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', default: false },
            message: { type: 'string' },
            error: { type: 'string' }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js', './src/app.js']
};

const specs = swaggerJsdoc(options);

module.exports = {
  specs,
  swaggerUi
};