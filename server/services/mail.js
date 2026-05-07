const nodemailer = require('nodemailer');
const otpModel = require('../models/otp')
const bcrypt = require('bcrypt');
// const fetch = require('node-fetch');
require('dotenv').config()
const { Resend } = require('resend');
const sgMail = require("@sendgrid/mail");

// async function verifyEmail(email) {
//     try {
//         const apiKey = process.env.ZEROBOUNCE_API_KEY;
//         const res = await fetch(`https://api.zerobounce.net/v2/validate?api_key=${apiKey}&email=${encodeURIComponent(email)}`);
//         const data = await res.json();
//         return data.status === "valid";
//     } catch (error) {
//         return false;
//     }
// }

// const transporter = nodemailer.createTransport({
//     host: "smtp.sendgrid.net",
//     port: 587,
//     auth: {
//         user: "apikey",
//         pass: process.env.SENDGRID_API_KEY
//     }
// });

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const resend = new Resend(process.env.RESEND_API_KEY);


const sendOtp = async (req, res, next) => {

    const { email } = req.body;
    // const result = await verifyEmail(email);
    // if (!result) {
    //     return res.status(400).json({ message: "This email does not exist", success: false });
    // }

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

        const { data: response, error } = await resend.emails.send(mailOptions);
        // const response = await transporter.sendMail(mailOptions);

        if (error) {
            throw new Error(error.message || JSON.stringify(error))
        }
        console.log(response);

        const hashedOtp = await bcrypt.hash(otp.toString(), 10);
        await otpModel.create({ email: email, otp: hashedOtp })

        next();
    } catch (error) {
        console.log("Error sending email:", error);
        return res.status(500).json({ message: "Failed to send email", error: error.message });
    }
}


module.exports = sendOtp;