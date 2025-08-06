const userModel = require('../models/user');
const checkUser = async (req, res, next) => {
    const { email, username } = req.body;
    if (!email) {
        return res.status(400).send({
            message: "Invalid email",
            success: false
        });
    }
    // email for reset
    if (!username) {
        try {
            const userEmail = await userModel.findOne({ email });
            if (!userEmail) {
                return res.status(400).send({
                    message: "You did not signIn yet",
                    success: false
                })
            }
        } catch (error) {
            return res.status(500).send({
                message: "Internal Server Error",
                success: false
            })
        }
    }

    next()
}

module.exports = checkUser;