const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        minLength:[3,'Username must atleast 3 characters long']

        // here first element of array "3" represents minLength is 3 and if it's length is less than 3 then message in the single quote will be send as error. 
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        maxLength:[50,'length of email id must not exceeds 50 characters']

        // here first element of array "3" represents minLength is 3 and if it's length is less than 3 then message in the single quote will be send as error. 
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:[5,'Password must atleast 5 characters long']

        // here first element of array "3" represents minLength is 3 and if it's length is less than 3 then message in the single quote will be send as error. 
    }
})

const userModel = mongoose.model('users',userSchema);

module.exports = userModel;