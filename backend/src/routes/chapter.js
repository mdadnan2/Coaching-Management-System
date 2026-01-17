const express = require("express");
const router = express.Router();
const controllers = require("../controllers/chapter_controller");
const middleware = require("../middleware/auth");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Chapters
 *   description: Chapter management endpoints
 */

/**
 * @swagger
 * /chapter/addchapter:
 *   post:
 *     summary: Add a new chapter to a course
 *     tags: [Chapters]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseId
 *               - title
 *               - description
 *               - concepts
 *               - references
 *             properties:
 *               courseId:
 *                 type: string
 *                 description: Course ObjectId this chapter belongs to
 *                 example: '507f1f77bcf86cd799439012'
 *               title:
 *                 type: string
 *                 description: Chapter title
 *               description:
 *                 type: string
 *                 description: Chapter description
 *               concepts:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of concepts covered in this chapter
 *               references:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Reference materials for this chapter
 *     responses:
 *       201:
 *         description: Chapter created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Chapter'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 */
router.post('/addchapter', authMiddleware.verifyToken, controllers.addChapter);

/**
 * @swagger
 * /chapter:
 *   get:
 *     summary: Get all chapters
 *     tags: [Chapters]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: courseId
 *         schema:
 *           type: string
 *         description: Filter chapters by course ID
 *         example: '507f1f77bcf86cd799439012'
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of chapters per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for chapter title or description
 *     responses:
 *       200:
 *         description: List of chapters retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Chapter'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *       401:
 *         description: Unauthorized
 */
router.get('/', authMiddleware.verifyToken, controllers.getAllChapters);

/**
 * @swagger
 * /chapter/{id}:
 *   get:
 *     summary: Get single chapter by ID
 *     tags: [Chapters]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Chapter ObjectId
 *         example: '507f1f77bcf86cd799439014'
 *     responses:
 *       200:
 *         description: Chapter retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Chapter'
 *       404:
 *         description: Chapter not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Delete chapter by ID
 *     tags: [Chapters]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Chapter ObjectId
 *         example: '507f1f77bcf86cd799439014'
 *     responses:
 *       200:
 *         description: Chapter deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Chapter not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authMiddleware.verifyToken, controllers.singleChapter);
router.delete('/:id', authMiddleware.verifyToken, controllers.deleteChapter);

/**
 * @swagger
 * /chapter/update:
 *   post:
 *     summary: Update chapter information
 *     tags: [Chapters]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - _id
 *             properties:
 *               _id:
 *                 type: string
 *                 description: Chapter ObjectId
 *                 example: '507f1f77bcf86cd799439014'
 *               courseId:
 *                 type: string
 *                 description: Course ObjectId this chapter belongs to
 *                 example: '507f1f77bcf86cd799439012'
 *               title:
 *                 type: string
 *                 description: Updated chapter title
 *               description:
 *                 type: string
 *                 description: Updated chapter description
 *               concepts:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Updated list of concepts
 *               references:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Updated reference materials
 *     responses:
 *       200:
 *         description: Chapter updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Chapter'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Chapter not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 */
router.post('/update', authMiddleware.verifyToken, controllers.updateChapter);

module.exports = router;