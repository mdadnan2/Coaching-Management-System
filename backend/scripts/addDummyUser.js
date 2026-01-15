require('dotenv').config({ path: require('path').join(__dirname, '../.env.development') });
const mongoose = require('mongoose');
const Student = require('../src/models/student');
const { encryptString } = require('../src/helpers/security');

const addDummyUser = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log('Connected to MongoDB');

        // Check if dummy user already exists
        const existingUser = await Student.findOne({ email: 'demo@test.com' });
        if (existingUser) {
            console.log('Dummy user already exists');
            return;
        }

        // Create dummy user
        const dummyUser = new Student({
            studentname: 'Demo User',
            studentId: 'DEMO0001',
            gender: 'male',
            phoneNumber: '9876543210',
            address: '123 Demo Street, Demo City',
            dateOfBirth: '1995-01-01',
            dateOfJoining: new Date().toISOString().split('T')[0],
            email: 'demo@test.com',
            password: encryptString('demo123'),
            highestQualification: 'bachelors',
            selectCourse: 'Demo Course',
            role: 'student',
            createdBy: 'system',
            createdDate: new Date(),
            recStatus: 'active'
        });

        await dummyUser.save();
        console.log('Dummy user created successfully!');
        console.log('Login credentials:');
        console.log('Email: demo@test.com');
        console.log('Password: demo123');

    } catch (error) {
        console.error('Error creating dummy user:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

addDummyUser();