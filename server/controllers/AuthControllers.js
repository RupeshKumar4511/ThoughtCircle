const userModel = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await userModel.findOne({ username });
        if (user) {
            return res.status(409).json({ message: "user is already exist", success: false })
        }

        const newUser = new userModel({ username, email, password });
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save()

        res.status(201).json({
            message: "signup successfully", success: true
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", success: false
        })
    }
}

const signin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({$or:[{username},{email:username}]});
        const errorMsg = "Username or password is wrong"
        if (!user) {
            return res.status(401).json({ message: errorMsg, success: false })
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(401).json({
                message: errorMsg, success: false
            })
        }

        const jwtToken = jwt.sign({
            username: user.username,
            email:user.email,
            role:user.role
        }, process.env.JWT_SECRET, { expiresIn: '24h' })

        res.cookie("token", jwtToken, {
            httpOnly: true,
            secure: true, 
            sameSite: "None"
        });

        res.status(200).json({
            message: "Login Success",
            success: true,
            username: user.username,
            email: user.email,
        })



    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", success: false
        })
    }
}

const sendEmailResponse =  (req, res) => {
  return res.status(200).json({ message: "Email sent Successfully..", success: true })
}

const verifyEmailResponse = (req, res) => {
  return res.status(200).json({ message: "Email verified Successfully..", success: true })
}

const signOut = (req, res) => {
  const { username } = req.body;
  if (req.user.username !== username) {
    return res.status(400).send({
      message: "Bad Request",
      success: false,
      username
    })
  }


  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  });
  return res.status(200).send({ message: "Logout Successfully", logout: true })


}

const resetPassword = async(req,res)=>{
    const {email,password}= req.body;
    try{
        const findUser = await userModel.findOne({email});
        if(!findUser) return res.status(403).send({message:"email is not found"});

        findUser.password = await bcrypt.hash(password,10)
        await findUser.save();
        return res.status(200).send({message:"Password Updated Sucessfully",success:true})

    }catch{
        res.status(500).send({message:"Internal Server Error"})
    }

}

const fetchUser = (req, res) => {
    return res.status(200).send({
        message:"Login Success",
        success:true,
        username:req.user.username,
        email:req.user.email
    });
}

module.exports = {
    signup, signin, signOut, sendEmailResponse, verifyEmailResponse,resetPassword, fetchUser
}