const express = require('express');
const cloudinary = require('cloudinary').v2;
const ensureAuthenticated = require('../Middlewares/Auth');
const postModel = require("../models/posts");
const routes = express.Router();
const removeTempFile = require('../services/removeTempFile')
require('dotenv').config()


cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret

});


routes.get('/user', ensureAuthenticated, (req, res) => {
    res.sendStatus(200);
})



routes.post('/user/create-post', ensureAuthenticated, async (req, res) => {


    const { title, body, tags } = req.body;
    const file = req.files?.image;

    if (!title || !body || !tags || !file) {
        return res.status(409).json({ message: "Please fill the required details", success: false })
    }

    const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg", "image/svg+xml"];

    if (!allowedMimeTypes.includes(file.mimetype)) {
        return res.status(400).send({ message: "Only image files are allowed!" });
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
                image: result.url,
                reactions: { like: 0, dislike: 0 }

            })
            // remove temp/file
            removeTempFile(file.tempFilePath);

            return res.status(201).json({
                message: "Post created successfully",
                success: true
            });

        })

    } catch (error) {
        return res.status(409).json({ message: "Please Fill the required Details", success: false })
    }

})

routes.get('/user/posts', ensureAuthenticated, async (req, res) => {


    try {
        const posts = await postModel.find();
        return res.json(posts);

    } catch (error) {
        return res.status(501).json({ message: "Internal Server Error", success: false })
    }

})

routes.get('/user/user-posts', ensureAuthenticated, async (req, res) => {
    try {

        const posts = await postModel.find({ username: req.user.username });
        return res.json(posts);

    } catch (error) {
        return res.status(501).json({ message: "Internal Server Error", success: false })
    }

})

routes.put('/user/user-posts/:_id', ensureAuthenticated, async (req, res) => {
    try {
        const { _id } = req.params;
        if (!_id || !req.body) {
            return res.status(400).send({ message: "Bad Request", success: false })
        }

        const post = await postModel.findById(_id);

        if (!post) {
            return res.status(400).send({ message: "No post found", success: false })
        }

        if (post.username !== req.user.username) {
            return res.status(400).send({ message: "This is not your post", success: false })
        }


        const { title, body, tags } = req.body;
        let finalImage = post.image;
        const file = req.files?.image;
        if (file) {

            const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg", "image/svg+xml"];

            if (!allowedMimeTypes.includes(file.mimetype)) {
                return res.status(400).send({ message: "Only image files are allowed!" });
            }


            const uploadedResult = await cloudinary.uploader.upload(file.tempFilePath)
            finalImage = uploadedResult.url;


            // remove temp/file
            removeTempFile(file.tempFilePath);


            // remove old image from cloudinary
            const publicId = post.image.split('/').slice(-1).join('/').split('.')[0];
            await cloudinary.uploader.destroy(publicId);


        }
        const updatedPost = {
            username: req.username,
            title,
            body,
            tags: tags.split(" "),
            image: finalImage,
            reactions: post.reactions
        }


        await postModel.findByIdAndUpdate(_id, { $set: updatedPost }, { new: true })

        return res.status(200).send({ message: "Post updated successfully", success: true })

    } catch (error) {
        return res.status(501).json({ message: "Internal Server Error", success: false, error: error })
    }

})

routes.patch('/user/posts/:id', ensureAuthenticated, async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({ message: "Bad Request", success: false })
        }

        const post = await postModel.findById(id);

        if (!post) {
            return res.status(400).send({ message: "No post found", success: false })
        }


        return res.json(post);

    } catch (error) {
        return res.status(501).json({ message: "Internal Server Error", success: false })
    }

})

routes.delete('/user/user-posts/:id', ensureAuthenticated, async (req, res) => {
    try {

        const { id } = req.params;
        if (!id) {
            return res.status(400).send({ message: "Bad Request", success: false })
        }
        const post = await postModel.findById(id);
        if (!post) {
            return res.status(401).send({ message: "No post found", success: false })
        }

        if ((req.user.username !== "rupesh") && (post.username !== req.user.username)) {
            return res.status(400).send({ message: "This is not your post", success: false })
        }

        // delete image from cloudinary
        const publicId = post.image.split('/').slice(-1).join('/').split('.')[0];
        await cloudinary.uploader.destroy(publicId);

        // delete post from mongodb
        await postModel.deleteOne({ _id: id })


        return res.status(200).send({ message: "Post Deleted Successfully", success: true })

    } catch (error) {
        return res.status(501).json({ message: "Internal Server Error", success: false })
    }

})

module.exports = routes