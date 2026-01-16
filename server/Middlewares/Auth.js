const jwt = require('jsonwebtoken');
const ensureAuthenticated = (req,res,next)=>{
    // const auth = req.headers['authorization'];
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Unauthorized , jwtToken required"})
    }
    try{
        const decodedData = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decodedData;
        next();
    }catch(error){
        return res.status(401).json({message:"Unauthorized , jwtToken is wrong or expired"})
    }

}

module.exports = ensureAuthenticated;