const {validationResult, matchedData} = require('express-validator');
const postDataValidation = (req,res,next)=>{

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({message:"bad request",error:error.array()})

    }   

    req.body = matchedData(req, { locations: ['body'] });

    req.params = matchedData(req, { locations: ['params'] });
    
    next();
}

module.exports = postDataValidation