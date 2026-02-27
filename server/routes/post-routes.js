const express = require('express');
const ensureAuthenticated = require('../Middlewares/Auth');
const routes = express.Router();
const { fetchUser } = require('../controllers/AuthControllers');
const { createPost, fetchPosts, fetchUserPost, updateUserPost, updatePostReaction, deleteUserPost, deleteAnyPost } = require('../controllers/postController');
const restrictTo = require('../Middlewares/restrictTo.js')
const {createPostSchema,updatePostSchema,deletePostSchema} = require('../utils/postSchema.js')
const postDataValidation = require('../Middlewares/postDataValidation.js')


routes.get('/user', ensureAuthenticated, fetchUser)

routes.post('/user/create-post', ensureAuthenticated, restrictTo(['admin','user']),createPostSchema, postDataValidation, createPost)

routes.get('/user/posts', ensureAuthenticated, restrictTo(['admin','user']), fetchPosts)

routes.get('/user/user-posts', ensureAuthenticated, restrictTo(['admin','user']), fetchUserPost)

routes.put('/user/user-posts/:_id', ensureAuthenticated, restrictTo(['admin','user']),updatePostSchema, postDataValidation, updateUserPost)

routes.patch('/user/posts/:id', ensureAuthenticated, restrictTo(['admin','user']), updatePostReaction)

routes.delete('/user/user-posts/:id', ensureAuthenticated, restrictTo(['admin','user']),deletePostSchema, postDataValidation, deleteUserPost)

routes.delete('/user/any-posts/:id', ensureAuthenticated, restrictTo(['admin']),deletePostSchema, postDataValidation, deleteAnyPost)

module.exports = routes