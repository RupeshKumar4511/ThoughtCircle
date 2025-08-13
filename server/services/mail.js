const nodemailer = require('nodemailer');
const otpModel = require('../models/otp')
const bcrypt = require('bcrypt');
const fetch = require('node-fetch');
require('dotenv').config()

async function verifyEmail(email) {
    try {
        const apiKey = process.env.ZEROBOUNCE_API_KEY;
        const res = await fetch(`https://api.zerobounce.net/v2/validate?api_key=${apiKey}&email=${encodeURIComponent(email)}`);
        const data = await res.json();
        return data.status === "valid";
    } catch (error) {
        return false;
    }
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.my_email,
        pass: process.env.app_password
    }

});

const sendOtp = async (req, res, next) => {

    const { email } = req.body;
    const result = await verifyEmail(email);
    if (!result) {
        return res.status(400).json({ message: "This email does not exist", success: false });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    const mailOptions = {
        from: process.env.my_email,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code is ${otp}`,
        html: `<div>
        <h1>Welcome to ThoughtCircle </h1>
        <h2>Your OTP code is: <b>${otp}</b></h2>
        </div>`
    };

    try {

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.messageId);

        const hashedOtp = await bcrypt.hash(otp.toString(), 10);
        await otpModel.create({ email: email, otp: hashedOtp })

        next();
    } catch (error) {
        console.log("Error sending email:", error);
        return res.status(500).json({ message: "Failed to send email", error: error.message });
    }
}


module.exports = sendOtp;