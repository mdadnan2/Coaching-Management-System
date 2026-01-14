const mongoose = require("mongoose");


const student = new mongoose.Schema({

    studentname: {
        type: String,
        required: true,
        trim: true
    },
    studentId: {
        type: String,
        required: true,
        unique: true,
        minlength: 8,
        maxlength: 8
    },
    gender: {
        type: String,
        required: true,

    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    address: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    dateOfJoining: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },

    aadharCard: {
        type: String,
        required: false,
        validate: {
            validator: function(v) {
                return !v || /^\d{12}$/.test(v);
            },
            message: 'Aadhar card must be 12 digits'
        }
    },
    panCard: {
        type: String,
        required: false,
        validate: {
            validator: function(v) {
                return !v || /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(v);
            },
            message: 'PAN card must be 10 characters (e.g., ABCDE1234F)'
        }
    },

    highestQualification: {
        type: String,
        enum: ['ssc', 'hsc', 'bachelors', 'masters', 'phd'],
        required: true,
    },
    selectCourse: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        enum: ['super_admin', 'admin', 'student'],
        default: 'student'
    },
    createdBy: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        required: true
    },
    updatedBy: {
        type: String,
        required: false
    },
    updatedDate: {
        type: Date,
        required: false
    },
    recStatus: {
        type: String,
        enum: ['active', 'In_Active', 'courseCompleted'],
        default: 'active'
    },
    notificationSettings: {
        email: {
            type: Boolean,
            default: true
        },
        push: {
            type: Boolean,
            default: true
        }
    }
});

module.exports = mongoose.model("student", student);


