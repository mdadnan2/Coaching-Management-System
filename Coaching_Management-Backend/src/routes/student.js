const express = require("express");
const router = express.Router();
const controllers = require("../controllers/student_controller");
const middleware = require("../middleware/auth");
const authMiddleware = require("../middleware/authMiddleware");


// routes - Temporarily removed authorization for testing
router.post('/register', authMiddleware.verifyToken, controllers.registerStudent);
router.get('/', authMiddleware.verifyToken, controllers.getStudent);
router.get('/stats', authMiddleware.verifyToken, controllers.studentsRecStatus);
router.delete('/:id', authMiddleware.verifyToken, controllers.deleteStudent);
router.post('/update', authMiddleware.verifyToken, controllers.updateStudent);
router.post('/settings', authMiddleware.verifyToken, controllers.updateNotificationSettings);
router.post('/change-password', authMiddleware.verifyToken, controllers.changePassword);
router.post('/login', controllers.loginStudent);
router.get('/qualification', controllers.studentsQualification);
router.get('/:id', authMiddleware.verifyToken, controllers.getSinglestudent);




module.exports = router;



