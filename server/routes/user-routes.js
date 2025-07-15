const express = require('express');
const authValidation = require('../Middlewares/AuthValidation');
const {signUpSchema,signInSchema,resetSchema} = require('../utils/userSchema');
const {checkSchema} = require('express-validator')
const { signup, signin } = require('../controllers/AuthControllers');
const verifyOtp = require('../Middlewares/otpVerify');
const sendOtp = require('../services/mail');
const resetPassword = require('../controllers/ResetPassword');
const routes = express.Router();





routes.post('/signin',checkSchema(signInSchema), authValidation, signin);
routes.post('/signup',checkSchema(signUpSchema), authValidation, verifyOtp, signup);
routes.post('/send-email', sendOtp);
routes.post('/verify-email',verifyOtp)
routes.post('/reset-password',checkSchema(resetSchema),authValidation,verifyOtp, resetPassword);


module.exports = routes;