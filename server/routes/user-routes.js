const express = require('express');
const authValidation = require('../Middlewares/AuthValidation');
const { signUpSchema, signInSchema, resetSchema } = require('../utils/userSchema');
const { checkSchema } = require('express-validator')
const { signup, signin, verifyEmailResponse, sendEmailResponse, signOut, resetPassword } = require('../controllers/AuthControllers');
const verifyOtp = require('../Middlewares/otpVerify');
const sendOtp = require('../services/mail');
const ensureAuthenticated = require('../Middlewares/Auth');
const checkUser = require('../Middlewares/checkUser');
const routes = express.Router();





routes.post('/signin', checkSchema(signInSchema), authValidation, signin);
routes.post('/signup', checkSchema(signUpSchema), authValidation, verifyOtp, signup);
routes.post('/send-email', checkUser, sendOtp,sendEmailResponse);
routes.post('/verify-email', verifyOtp, verifyEmailResponse);
routes.post('/reset-password', checkSchema(resetSchema), authValidation, verifyOtp, resetPassword);
routes.post('/sign-out', ensureAuthenticated, signOut)



module.exports = routes;