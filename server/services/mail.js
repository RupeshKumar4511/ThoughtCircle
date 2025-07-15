const nodemailer = require('nodemailer');
const otpModel = require('../models/otp')
const bcrypt = require('bcrypt');
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.my_email,
        pass: process.env.app_password
    }

});

const sendOtp = async (req, res, next) => {

    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000);

    const mailOptions = {
        from: process.env.my_email, 
        to:email,
        subject: "Your OTP Code",
        text: `Your OTP code is ${otp}`,
        html: `<h2>Your OTP code is: <b>${otp}</b></h2>`
    };

    try {
        
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.messageId);
        
        const hashedOtp = await bcrypt.hash(otp.toString(),10);
        await otpModel.create({email:email,otp:hashedOtp})

        next();
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Failed to send email", error: error.message });
    }
}


module.exports = sendOtp;