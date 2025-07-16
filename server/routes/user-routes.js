const express = require('express');
const authValidation = require('../Middlewares/AuthValidation');
const {signUpSchema,signInSchema,resetSchema} = require('../utils/userSchema');
const {checkSchema} = require('express-validator')
const { signup, signin } = require('../controllers/AuthControllers');
const verifyOtp = require('../Middlewares/otpVerify');
const sendOtp = require('../services/mail');
const resetPassword = require('../controllers/ResetPassword');
const ensureAuthenticated = require('../Middlewares/Auth');
const routes = express.Router();





routes.post('/signin',checkSchema(signInSchema), authValidation, signin);
routes.post('/signup',checkSchema(signUpSchema), authValidation, verifyOtp, signup);
routes.post('/send-email', sendOtp,(req,res)=>{
    return res.status(200).json({message:"Email sent Successfully..",success:true})
});
routes.post('/verify-email',verifyOtp,(req,res)=>{
    return res.status(200).json({message:"Email verified Successfully..",success:true})
});
routes.post('/reset-password',checkSchema(resetSchema),authValidation,verifyOtp, resetPassword);

routes.post('/sign-out',ensureAuthenticated,(req,res)=>{
  const {username}= req.body;
    if(req.user.username !== username){
      return res.status(400).send({message:"Bad Request",
      success:true,
      username:user.username ,
      email:user.email,})
    }

    
    res.clearCookie('token')
    return res.status(200).send({message:"Logout Successfully",logout:true})


})



module.exports = routes;