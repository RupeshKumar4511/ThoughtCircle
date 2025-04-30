const express = require('express');
const cloudinary = require('cloudinary').v2;
const { signupValidation, signinValidation } = require('../Middlewares/AuthValidation');
const { signup, signin } = require('../controllers/AuthControllers');
const ensureAuthenticated = require('../controllers/Auth');
const postModel = require("../models/posts");
const routes = express.Router();
require('dotenv').config()


cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret

});


routes.post('/signin', signinValidation, signin);
routes.post('/signup', signupValidation, signup);
routes.post('/create-post', ensureAuthenticated,async(req, res) => {

    
    const { title, body, tags } = req.body;
    const file = req.files?.image;
    // console.log(file)
    if (!title || !body || !tags || !file) {
        return res.status(409).json({ message: "Please Fill the required Details", success: false })
    }

    try {


        cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {

            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Image upload failed", success: false });
            }

            await postModel.create({
                username: req.user.username,
                title,
                body,
                tags: tags.split(' '),
                image: result.url

            })

            return res.status(201).json({
                message: "Post created successfully",
                success: true
            });

        })

    } catch (error) {
        return res.status(409).json({ message: "Please Fill the required Details", success: false })
    }

})

routes.get('/posts', async (req, res) => {


    try {

        const posts = await postModel.find();
        return res.json(posts);

    } catch (error) {
        return res.status(501).json({ message: "Internal Server Error", success: false })
    }

})

routes.get('/yourposts', ensureAuthenticated, async (req, res) => {
    try {

        const posts = await postModel.find({ username: req.user.username });
        return res.json(posts);

    } catch (error) {
        return res.status(501).json({ message: "Internal Server Error", success: false })
    }

})

module.exports = routes;