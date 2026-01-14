const express = require("express");
const router = express.Router();
const controllers = require("../controllers/course_controller");
const middleware = require("../middleware/auth");
const authMiddleware = require("../middleware/authMiddleware");


// Routes - Temporarily removed authorization for testing
router.post('/addcourse', authMiddleware.verifyToken, controllers.addCourse);
router.get('/', authMiddleware.verifyToken, controllers.getAllCourses);
router.get('/:id', authMiddleware.verifyToken, controllers.singleCourse);
router.delete('/:id', authMiddleware.verifyToken, controllers.deleteCourse);
router.post('/update', authMiddleware.verifyToken, controllers.updateCourse);






module.exports = router;
