const express = require('express');
const ensureAuthenticated = require('../Middlewares/Auth.js');
const { createPost, fetchPosts, fetchUserPost, updateUserPost, updatePostReaction, deleteUserPost, deleteAnyPost, rateLimiter } = require('../controllers/postController.js');
const { checkSchema } = require('express-validator')
const restrictTo = require('../Middlewares/restrictTo.js')
const { createPostSchema, updatePostSchema, deletePostSchema } = require('../utils/postSchema.js')
const postDataValidation = require('../Middlewares/postDataValidation.js')

const routes = express.Router();


routes.post('/create-post', ensureAuthenticated, restrictTo(['admin', 'user']),rateLimiter, checkSchema(createPostSchema), postDataValidation, createPost)

routes.get('/', ensureAuthenticated, restrictTo(['admin', 'user']), fetchPosts)

routes.get('/my-posts', ensureAuthenticated, restrictTo(['admin', 'user']), fetchUserPost)

routes.put('/my-posts/:_id', ensureAuthenticated, restrictTo(['admin', 'user']),rateLimiter, checkSchema(updatePostSchema), postDataValidation, updateUserPost)

routes.patch('/:id', ensureAuthenticated, restrictTo(['admin', 'user']), updatePostReaction)

routes.delete('/my-posts/:id', ensureAuthenticated, restrictTo(['admin', 'user']), rateLimiter, checkSchema(deletePostSchema), postDataValidation, deleteUserPost)

routes.delete('/any-posts/:id', ensureAuthenticated, restrictTo(['admin']), checkSchema(deletePostSchema), postDataValidation, deleteAnyPost)

module.exports = routes