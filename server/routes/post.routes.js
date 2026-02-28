const express = require('express');
const ensureAuthenticated = require('../Middlewares/Auth.js');
const { createPost, fetchPosts, fetchUserPost, updateUserPost, updatePostReaction, deleteUserPost, deleteAnyPost, rateLimiter } = require('../controllers/postController.js');
const { checkSchema } = require('express-validator')
const restrictTo = require('../Middlewares/restrictTo.js')
const { createPostSchema, updatePostSchema, deletePostSchema } = require('../utils/postSchema.js')
const postDataValidation = require('../Middlewares/postDataValidation.js')

const routes = express.Router();


/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post management with Cloudinary image uploads
 */

/**
 * @swagger
 * /api/v1/posts/create-post:
 *   post:
 *     summary: Create a new post with an image
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - body
 *               - tags
 *               - image
 *             properties:
 *               title: { type: string, example: "My First Post" }
 *               body: { type: string, example: "This is the content of the post" }
 *               tags: { type: string, description: "Space separated tags", example: "nature travel" }
 *               image: { type: string, format: binary, description: "Image file (jpg, png, svg)" }
 *     responses:
 *       201:
 *         description: Post created successfully
 *       409:
 *         description: Title already exists or missing details
 *       429:
 *         description: Too many requests (Rate limit exceeded)
 */
routes.post('/create-post', ensureAuthenticated, restrictTo(['admin', 'user']), rateLimiter, checkSchema(createPostSchema), postDataValidation, createPost);

/**
 * @swagger
 * /api/v1/posts:
 *   get:
 *     summary: Fetch all posts from all users
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: A list of all posts
 */
routes.get('/', ensureAuthenticated, restrictTo(['admin', 'user']), fetchPosts);

/**
 * @swagger
 * /api/v1/posts/my-posts:
 *   get:
 *     summary: Fetch posts created by the logged-in user
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User specific posts
 */
routes.get('/my-posts', ensureAuthenticated, restrictTo(['admin', 'user']), fetchUserPost);

/**
 * @swagger
 * /api/v1/posts/my-posts/{_id}:
 *   put:
 *     summary: Update a post (User must be the owner)
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema: { type: string }
 *         description: MongoDB ID of the post
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               body: { type: string }
 *               tags: { type: string }
 *               image: { type: string, format: binary }
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       400:
 *         description: Not your post or bad request
 */
routes.put('/my-posts/:_id', ensureAuthenticated, restrictTo(['admin', 'user']), rateLimiter, checkSchema(updatePostSchema), postDataValidation, updateUserPost);

/**
 * @swagger
 * /api/v1/posts/{id}:
 *   patch:
 *     summary: Toggle Like/Dislike on a post
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reactions
 *             properties:
 *               reactions:
 *                 type: object
 *                 properties:
 *                   like: { type: boolean }
 *                   dislike: { type: boolean }
 *     responses:
 *       200:
 *         description: Post Reaction updated
 *       400:
 *         description: Bad Request (Likely sent both true or wrong types)
 */
routes.patch('/:id', ensureAuthenticated, restrictTo(['admin', 'user']), updatePostReaction);

/**
 * @swagger
 * /api/v1/posts/my-posts/{id}:
 *   delete:
 *     summary: Delete your own post
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Post Deleted Successfully
 *       401:
 *         description: No post found or unauthorized
 */
routes.delete('/my-posts/:id', ensureAuthenticated, restrictTo(['admin', 'user']), rateLimiter, checkSchema(deletePostSchema), postDataValidation, deleteUserPost);

/**
 * @swagger
 * /api/v1/posts/any-posts/{id}:
 *   delete:
 *     summary: Delete any post (Admin Only)
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Post Deleted Successfully
 *       403:
 *         description: Forbidden (Only admins can access this)
 */
routes.delete('/any-posts/:id', ensureAuthenticated, restrictTo(['admin']), checkSchema(deletePostSchema), postDataValidation, deleteAnyPost);


module.exports = routes