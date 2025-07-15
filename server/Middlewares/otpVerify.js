const otpModel = require("../models/otp");
const bcrypt = require('bcrypt');
const verifyOtp = async (req, res, next) => {
    const { otp,email } = req.body;

    try {
        const findEmail = await otpModel.findOne({email})

        if (!findEmail.otp || !otp) {
            return res.status(403).send({message:"Email id is not valid"})
        }
        const isMatch = await bcrypt.compare(otp.toString(),findEmail.otp);
        if (!isMatch) {
            return res.status(400).send({
                message: "Incorrect Otp"
            })
        }
        next()
    }catch(error){
        return res.status(501).send({message:"Internal server error",})
    }
    
}

module.exports = verifyOtp;