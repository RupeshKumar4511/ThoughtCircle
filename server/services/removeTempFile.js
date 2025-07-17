const fs = require('fs');
const removeTempFile = (filepath)=>{
    fs.unlink(filepath,(err)=>{
        if(err){
            console.error(err)
        }
    })
} 

module.exports = removeTempFile;