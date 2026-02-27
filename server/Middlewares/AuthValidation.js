const {validationResult, matchedData} = require('express-validator');
const authValidation = (req,res,next)=>{

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({message:"bad request",error:error.array()})

    }   

    req.body = matchedData(req, { locations: ['body'] });
    
    next();
}

module.exports = authValidation