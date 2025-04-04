const jwt = require('jsonwebtoken');
const ensureAuthenticated = (req,res,next)=>{
    const auth = req.headers['authorization'];
    // const token = req.cookies.token;
    if(!auth){
        return res.status(403).json({message:"Unauthorized , jwtToken required"})
    }
    try{
        const decodedData = jwt.verify(auth,process.env.JWT_SECRET);
        req.user = decodedData;
        next();
    }catch(error){
        return res.status(403).json({message:"Unauthorized , jwtToken is wrong or expired"})
    }
    next();
}

module.exports = ensureAuthenticated;