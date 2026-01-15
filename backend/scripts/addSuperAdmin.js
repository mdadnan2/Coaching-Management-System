require('dotenv').config({ path: require('path').join(__dirname, '../.env.development') });
const mongoose = require('mongoose');
const Student = require('../src/models/student');
const { encryptString } = require('../src/helpers/security');

const addSuperAdmin = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log('Connected to MongoDB');

        // Check if super admin already exists
        const existingAdmin = await Student.findOne({ email: 'admin@test.com' });
        if (existingAdmin) {
            console.log('Super admin already exists');
            return;
        }

        // Create super admin user
        const superAdmin = new Student({
            studentname: 'Super Admin',
            studentId: 'ADMIN001',
            gender: 'male',
            phoneNumber: '1234567890',
            address: '123 Admin Street, Admin City',
            dateOfBirth: '1990-01-01',
            dateOfJoining: new Date().toISOString().split('T')[0],
            email: 'admin@test.com',
            password: encryptString('admin123'),
            highestQualification: 'masters',
            role: 'super_admin',
            createdBy: 'system',
            createdDate: new Date(),
            recStatus: 'active'
        });

        await superAdmin.save();
        console.log('Super admin created successfully!');
        console.log('Login credentials:');
        console.log('Email: admin@test.com');
        console.log('Password: admin123');

    } catch (error) {
        console.error('Error creating super admin:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

addSuperAdmin();