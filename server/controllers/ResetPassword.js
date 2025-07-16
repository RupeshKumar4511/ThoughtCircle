const userModel = require('../models/user');
const bcrypt = require('bcrypt')
const resetPassword = async(req,res)=>{
    const {email,password}= req.body;
    try{
        const findUser = await userModel.findOne({email});
        if(!findUser) return res.status(403).send({message:"email is not found"});

        findUser.password = await bcrypt.hash(password,10)
        await findUser.save();
        return res.status(200).send({message:"Password Updated Sucessfully",success:true})

    }catch{
        res.status(501).send({message:"Internal Server Error"})
    }

}

module.exports = resetPassword;