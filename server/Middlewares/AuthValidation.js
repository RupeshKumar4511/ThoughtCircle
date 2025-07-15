// const Joi = require('joi');
const {validationResult} = require('express-validator');
const authValidation = (req,res,next)=>{
    
    // const schema = Joi.object({
    //     username:Joi.string().min(3).max(100).required(),
    //     password:Joi.string().min(5).max(100).required(),
        
    // })

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({message:"bad request",error:error.array()})

    }   

    next();
}

// const signinValidation = (req,res,next)=>{
//     const schema = Joi.object({
//         username:Joi.string().min(3).max(100).required(),
//         password:Joi.string().min(5).max(100).required(),
        
//     })

//     const {error} = schema.validate(req.body);
//     if(error){
//         return res.status(400).json({message:"bad request",error})

//     }

//     next();
// }

module.exports = authValidation