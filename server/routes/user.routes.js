const express = require('express');
const authValidation = require('../Middlewares/AuthValidation');
const { signUpSchema, signInSchema, resetSchema } = require('../utils/userSchema');
const { checkSchema } = require('express-validator')
const { signup, signin, verifyEmailResponse, sendEmailResponse, signOut, resetPassword, fetchUser } = require('../controllers/AuthControllers');
const verifyOtp = require('../Middlewares/otpVerify');
const sendOtp = require('../services/mail');
const ensureAuthenticated = require('../Middlewares/Auth');
const checkUser = require('../Middlewares/checkUser');
const routes = express.Router();





/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Authentication and User Management
 */

/**
 * @swagger
 * /api/v1/users/signin:
 *   post:
 *     summary: User sign in (Sets Auth Cookie)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Can be username OR email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login Success
 *       401:
 *         description: Username or password is wrong
 */
routes.post('/signin', checkSchema(signInSchema), authValidation, signin);

/**
 * @swagger
 * /api/v1/users/signup:
 *   post:
 *     summary: Register a new user (Requires OTP)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - otp
 *             properties:
 *               username: { type: string }
 *               email: { type: string }
 *               password: { type: string }
 *               otp: { type: string, description: "6-digit OTP sent to email" }
 *     responses:
 *       201:
 *         description: signup successfully
 *       400:
 *         description: Incorrect Otp or Missing fields
 *       409:
 *         description: user is already exist
 */
routes.post('/signup', checkSchema(signUpSchema), authValidation, verifyOtp, signup);

/**
 * @swagger
 * /api/v1/users/send-email:
 *   post:
 *     summary: Request an OTP email
 *     description: Checks if email is valid and sends a 6-digit code via SendGrid
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email: { type: string }
 *               username: 
 *                 type: string
 *                 description: Optional. If provided, skips the 'user exists' check in checkUser middleware.
 *     responses:
 *       200:
 *         description: Email sent Successfully..
 *       400:
 *         description: Invalid email or User not found
 */
routes.post('/send-email', checkUser, sendOtp, sendEmailResponse);

/**
 * @swagger
 * /api/v1/users/verify-email:
 *   post:
 *     summary: Validate an OTP code
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email: { type: string }
 *               otp: { type: string }
 *     responses:
 *       200:
 *         description: Email verified Successfully..
 *       400:
 *         description: Incorrect Otp
 */
routes.post('/verify-email', verifyOtp, verifyEmailResponse);

/**
 * @swagger
 * /api/v1/users/reset-password:
 *   post:
 *     summary: Reset password using OTP
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - otp
 *             properties:
 *               email: { type: string }
 *               password: { type: string, description: "New password to set" }
 *               otp: { type: string }
 *     responses:
 *       200:
 *         description: Password Updated Sucessfully
 *       400:
 *         description: Incorrect Otp
 *       403:
 *         description: Email not found
 */
routes.post('/reset-password', checkSchema(resetSchema), authValidation, verifyOtp, resetPassword);

/**
 * @swagger
 * /api/v1/users/sign-out:
 *   post:
 *     summary: Logout and clear session
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *             properties:
 *               username: { type: string, description: "Must match logged in user" }
 *     responses:
 *       200:
 *         description: Logout Successfully
 */
routes.post('/sign-out', ensureAuthenticated, signOut);

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Fetch current user profile
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Returns username and email
 *       401:
 *         description: Unauthorized (Token missing/invalid)
 */
routes.get('/', ensureAuthenticated, fetchUser);


module.exports = routes;