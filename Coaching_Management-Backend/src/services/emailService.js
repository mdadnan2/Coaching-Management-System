const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Send email function
const sendEmail = async (to, subject, html) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to,
            subject,
            html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Email error:', error);
        return { success: false, error: error.message };
    }
};

// Email templates
const emailTemplates = {
    studentRegistration: (studentName) => ({
        subject: 'Welcome to Coaching Management!',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #6366f1;">Welcome ${studentName}!</h2>
                <p>Thank you for joining our coaching program.</p>
                <p>You can now access your dashboard and start learning.</p>
                <p style="color: #64748b; font-size: 14px;">Best regards,<br>Coaching Management Team</p>
            </div>
        `
    }),
    
    courseEnrollment: (studentName, courseName) => ({
        subject: `Enrolled in ${courseName}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #6366f1;">Course Enrollment Confirmation</h2>
                <p>Hi ${studentName},</p>
                <p>You have been successfully enrolled in <strong>${courseName}</strong>.</p>
                <p>Start learning today!</p>
                <p style="color: #64748b; font-size: 14px;">Best regards,<br>Coaching Management Team</p>
            </div>
        `
    }),

    passwordChange: (studentName) => ({
        subject: 'Password Changed Successfully',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #6366f1;">Password Changed</h2>
                <p>Hi ${studentName},</p>
                <p>Your password has been changed successfully.</p>
                <p>If you didn't make this change, please contact us immediately.</p>
                <p style="color: #64748b; font-size: 14px;">Best regards,<br>Coaching Management Team</p>
            </div>
        `
    })
};

module.exports = {
    sendEmail,
    emailTemplates
};
