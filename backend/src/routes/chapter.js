const express = require("express");
const router = express.Router();
const controllers = require("../controllers/chapter_controller");
const middleware = require("../middleware/auth");
const authMiddleware = require("../middleware/authMiddleware");

// Routes - Open access for all authenticated users
router.post('/addchapter', authMiddleware.verifyToken, controllers.addChapter);
router.get('/', authMiddleware.verifyToken, controllers.getAllChapters);
router.get('/:id', authMiddleware.verifyToken, controllers.singleChapter);
router.delete('/:id', authMiddleware.verifyToken, controllers.deleteChapter);
router.post('/update', authMiddleware.verifyToken, controllers.updateChapter);








module.exports = router;