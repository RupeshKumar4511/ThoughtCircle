const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        minLength:[3,'Username must atleast 3 characters long'],
        maxLength:[20,'Username must not exceeds 20 characters.'] 
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Invalid email "],
        maxLength:[52,'length of email id must not exceeds 50 characters']

    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:[8,'Password must atleast 8 characters long'],
        maxLength:[32,'length of Password must not exceeds 32 characters']
    },
    role:{
        type:String,
        required:true,
        trim:true,
        enum: ['user', 'admin'],
        default: 'user'
    }
})

userSchema.index({username:1,email:1})

const userModel = mongoose.model('users',userSchema);

module.exports = userModel;