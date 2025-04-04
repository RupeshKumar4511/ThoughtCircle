const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connection = mongoose.connect(process.env.MONGOOSE_URI,
).then(()=>{ 
    console.log('Database Connected Successfully')}
).catch((error)=>{
    console.error(error);
})



module.exports = connection; 