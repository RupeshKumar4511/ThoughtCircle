const express = require('express');
// const connectedDB =  require('../models/db');
const {signupValidation,signinValidation} = require('../Middlewares/AuthValidation'); 
const {signup,signin} = require('../controllers/AuthControllers'); 
const ensureAuthenticated = require('../controllers/Auth'); 
const postModel = require("../models/posts");

const routes = express.Router();

routes.post('/signin',signinValidation,signin);
routes.post('/signup',signupValidation,signup);
routes.post('/create-post',ensureAuthenticated,async(req,res)=>{

    // image to be included
    const {title,body,tags} = req.body;
    if(!title  || !body || !tags){
        return res.status(409).json({message:"Please Fill the required Details",success:false})
    }

    try{
        await postModel.create({
            username:req.user.username,
            title,
            body,
            tags: tags.split(' '),

        })
        
        return res.status(200).json({
            message: "Post created successfully",
            success: true
        });
    
    }catch(error){
        return res.status(409).json({message:"Please Fill the required Details",success:false})
    }
   
})

routes.get('/posts',async (req,res)=>{

    
        try{
     
            const posts =   await postModel.find();
            return res.json(posts);

        }catch(error){
            return res.status(501).json({message:"Internal Server Error",success:false})
        }
    
})

routes.get('/yourposts',ensureAuthenticated,async (req,res)=>{
    try{
 
        const posts =   await postModel.find({username:req.user.username});
        return res.json(posts);

    }catch(error){
        return res.status(501).json({message:"Internal Server Error",success:false})
    }

})

module.exports = routes;