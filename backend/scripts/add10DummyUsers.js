const mongoose = require('mongoose');
const Student = require('../src/models/student');
const { encryptString } = require('../src/helpers/security');

// Database connection
const DB_CONNECTION_STRING = 'mongodb+srv://adnan9:Pune123@cluster0.lfm5r5d.mongodb.net/Coaching_management';

const add10DummyUsers = async () => {
    try {
        await mongoose.connect(DB_CONNECTION_STRING);
        console.log('Connected to MongoDB');

        const users = [
            { name: 'John Doe', email: 'john.doe@test.com', phone: '9123456701', qualification: 'bachelors', course: 'Web Development' },
            { name: 'Jane Smith', email: 'jane.smith@test.com', phone: '9123456702', qualification: 'masters', course: 'Data Science' },
            { name: 'Mike Johnson', email: 'mike.johnson@test.com', phone: '9123456703', qualification: 'bachelors', course: 'Mobile Development' },
            { name: 'Sarah Williams', email: 'sarah.williams@test.com', phone: '9123456704', qualification: 'hsc', course: 'UI/UX Design' },
            { name: 'David Brown', email: 'david.brown@test.com', phone: '9123456705', qualification: 'masters', course: 'Cloud Computing' },
            { name: 'Emily Davis', email: 'emily.davis@test.com', phone: '9123456706', qualification: 'bachelors', course: 'Cybersecurity' },
            { name: 'Chris Wilson', email: 'chris.wilson@test.com', phone: '9123456707', qualification: 'ssc', course: 'DevOps' },
            { name: 'Lisa Anderson', email: 'lisa.anderson@test.com', phone: '9123456708', qualification: 'masters', course: 'AI/ML' },
            { name: 'Tom Martinez', email: 'tom.martinez@test.com', phone: '9123456709', qualification: 'bachelors', course: 'Blockchain' },
            { name: 'Anna Taylor', email: 'anna.taylor@test.com', phone: '9123456710', qualification: 'phd', course: 'Game Development' }
        ];

        let created = 0;
        const randomNum = Math.floor(Math.random() * 90000000) + 10000000;
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            
            const newUser = new Student({
                studentname: user.name,
                studentId: `${randomNum + i}`,
                gender: i % 2 === 0 ? 'male' : 'female',
                phoneNumber: user.phone,
                address: `${i + 1} Demo Street, Demo City`,
                dateOfBirth: `199${i % 10}-0${(i % 9) + 1}-15`,
                dateOfJoining: new Date().toISOString().split('T')[0],
                email: user.email,
                password: encryptString('demo123'),
                highestQualification: user.qualification,
                selectCourse: user.course,
                role: 'student',
                createdBy: 'system',
                createdDate: new Date(),
                recStatus: 'active'
            });
            
            await newUser.save();
            created++;
            console.log(`✓ Created: ${user.name} (${user.email})`);
        }

        console.log(`\n${created} users created successfully!`);
        console.log('All passwords: demo123');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

add10DummyUsers();
