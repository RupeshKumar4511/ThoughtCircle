const mongoose = require('mongoose');

const userPostModel = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: [3, 'Username must atleast 3 characters long'],
        maxLength: [20, 'Maximum length of username is 20 characters']
    },
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: [2, 'Title must atleast 2 characters long'],
        maxLength: [50, 'Maximum length of title is 50 characters']
    },
    body: {
        type: String,
        required: true,
        trim: true,
        minLength: [10, 'Post Content must atleast 10 characters long'],
        maxLength: [1000, 'Maximum length of post content is 1000 characters']
    },
    tags: {
        type: [String],
        required: true,
        trim: true,
        minLength: [2, 'Tag must atleast 2 characters long'],
        maxLength: [100, 'Maximum length of tags is 100 characters']
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    reactions: {
        like: {
            type: Number,
            default: 0
        },
        dislike: {
            type: Number,
            default: 0
        }
    }
})

const postModel = mongoose.model('posts', userPostModel);

module.exports = postModel;