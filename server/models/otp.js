const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Invalid email "],
    maxLength:[52,'length of email id must not exceeds 50 characters']
  },
  otp: {
    type: String, 
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300 //  300 seconds
  },
});

otpSchema.index({email:1})

const otpModel = mongoose.model('otps', otpSchema);

module.exports = otpModel
