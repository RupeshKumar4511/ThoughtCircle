const mongoose = require('mongoose');

const postReaction = mongoose.Schema({
    postId: {
        type: String,
        required: true
    },
    totalLikes: {
        type: Number,
        required: true,
    },
    totalDislikes: {
        type: Number,
        required: true,
    },
    createdBy: [
        {
            username: {
                type: String,
                required: true,
            },
            like: {
                type: Boolean,
                required: true,
            },
            dislike: {
                type: Boolean,
                required: true,
            },
        }
    ]

},{timestamps:true})

postReaction.index({postId:1})

const reactionModel = mongoose.model('postReactions', postReaction);

module.exports = reactionModel;