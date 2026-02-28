const cloudinary = require('cloudinary').v2; // version 2 
const postModel = require("../models/posts");
const removeTempFile = require('../services/removeTempFile');
const reactionModel = require('../models/reactions');
const {rateLimit} = require('express-rate-limit')
const dotenv = require('dotenv');
dotenv.config()

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret

});

const rateLimiter = rateLimit({
	windowMs: 1 * 60 * 1000, 
	limit: 5, 
	standardHeaders: 'draft-8',
	legacyHeaders: false, 
	ipv6Subnet: 56,
    message:"Too many request, Only 5 requests can be created in a minute."
})

const createPost = async (req, res) => {


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

        const post = await postModel.findOne({title})

        if(post){
            return res.status(409).send({success:false,message:"Please use some other title"})
        }


        cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {

            if (err) {
                console.log(err);
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

}

const fetchPosts = async (req, res) => {


    try {
        const posts = await postModel.find()
        return res.json(posts);

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", success: false })
    }

}

const fetchUserPost = async (req, res) => {
    try {

        const posts = await postModel.find({ username: req.user.username });
        return res.json(posts);

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", success: false })
    }

}

const updateUserPost = async (req, res) => {
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
        return res.status(500).json({ message: "Internal Server Error", success: false, error: error })
    }

}

const updatePostReaction = async (req, res) => {
    try {
        const { id } = req.params;
        const { reactions: { like, dislike } } = req.body
        if (!id || like === undefined || dislike === undefined) {
            return res.status(400).send({ message: "Bad Request", success: false })
        }

        if (typeof like !== "boolean" || typeof dislike !== "boolean" || like === dislike) {
            return res.status(400).send({ message: "Bad Request", success: false })
        }

        const post = await postModel.findById(id);

        if (!post) {
            return res.status(404).send({ message: "No post found", success: false })
        }

        // this model may not be created
        let findReaction = await reactionModel.findOne({ postId: id });

        if (!findReaction) {
            findReaction = await reactionModel.create({
                postId: id,
                totalLikes: like ? 1 : 0,
                totalDislikes: dislike ? 1 : 0,
                createdBy: [{
                    username: req.user.username,
                    like,
                    dislike
                }]
            })

            post.reactions = {
                like: findReaction.totalLikes,
                dislike: findReaction.totalDislikes,
            };

            await post.save()

            return res.status(200).send({ message: "Reaction added", success: true });
        }

        // required document found but user is not found
        const userIndex = findReaction.createdBy.findIndex(user => user.username === req.user.username)

        if (userIndex === -1) {
            if (like) findReaction.totalLikes += 1
            if (dislike) findReaction.totalDislikes += 1
            findReaction.createdBy.push({
                username: req.user.username,
                like,
                dislike
            })
            await findReaction.save();

            post.reactions = {
                like: findReaction.totalLikes,
                dislike: findReaction.totalDislikes,
            };
            await post.save()


            return res.status(200).send({ message: "Reaction added", success: true });
        }

        // both document and user are found.

        // for unlike case
        if (findReaction.createdBy[userIndex].like === true && like) {
            findReaction.totalLikes -= 1
            findReaction.createdBy[userIndex].like = false;
            await findReaction.save()

            // like case
        } else if (findReaction.createdBy[userIndex].like === false && like) {
            findReaction.totalLikes += 1;
            findReaction.createdBy[userIndex].like = true;
            if (findReaction.createdBy[userIndex].dislike === true) {
                findReaction.createdBy[userIndex].dislike = false;
                findReaction.totalDislikes -= 1
            }
            await findReaction.save()
        }

        // for undislike 
        if (findReaction.createdBy[userIndex].dislike === true && dislike) {
            findReaction.totalDislikes -= 1
            findReaction.createdBy[userIndex].dislike = false;
            await findReaction.save()

            // for dislike
        } else if (findReaction.createdBy[userIndex].dislike === false && dislike) {
            findReaction.totalDislikes += 1
            if (findReaction.createdBy[userIndex].like === true) {
                findReaction.createdBy[userIndex].like = false;
                findReaction.totalLikes -= 1
            }
            findReaction.createdBy[userIndex].dislike = true;
            await findReaction.save()
        }

        post.reactions = {
            like: findReaction.totalLikes,
            dislike: findReaction.totalDislikes,
        };
        await post.save()



        return res.status(200).send({ message: "Post Reaction updated" });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", success: false })
    }

}

const deleteUserPost = async (req, res) => {
    try {

        const { id } = req.params;
        if (!id) {
            return res.status(400).send({ message: "Bad Request", success: false })
        }
        const post = await postModel.findById(id);
        if (!post) {
            return res.status(401).send({ message: "No post found", success: false })
        }

        if (post.username !== req.user.username) {
            return res.status(400).send({ message: "This is not your post", success: false })
        }

        // delete image from cloudinary
        const publicId = post.image.split('/').slice(-1).join('/').split('.')[0];
        await cloudinary.uploader.destroy(publicId);

        // delete post from mongodb
        await postModel.deleteOne({ _id: id })


        return res.status(200).send({ message: "Post Deleted Successfully", success: true })

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", success: false })
    }

}

const deleteAnyPost = async (req, res) => {
    try {

        const { id } = req.params;
        if (!id) {
            return res.status(400).send({ message: "Bad Request", success: false })
        }
        const post = await postModel.findById(id);
        if (!post) {
            return res.status(401).send({ message: "No post found", success: false })
        }

        // delete image from cloudinary
        const publicId = post.image.split('/').slice(-1).join('/').split('.')[0];
        await cloudinary.uploader.destroy(publicId);

        // delete post from mongodb
        await postModel.deleteOne({ _id: id })


        return res.status(200).send({ message: "Post Deleted Successfully", success: true })

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", success: false })
    }

}

module.exports = {
    createPost, fetchPosts, fetchUserPost, updateUserPost, updatePostReaction, deleteUserPost, deleteAnyPost, rateLimiter
}