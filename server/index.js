const express = require('express');
const app = express();
const userRoutes = require('./routes/user-routes');
const cookieparser = require('cookie-parser');
const bodyParser = require('body-parser');
const connectedDB =  require('./models/db');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT;

// app.use(cors({
//     origin: "http://localhost:5173",  
//     credentials: true
//   }));

app.use(express.json());
app.use(cors())
app.use(cookieparser());
app.use(bodyParser.urlencoded({extended:true}))



// app.use('/',path.join(__dirname,'public'));
app.use('/',userRoutes);

app.listen(port,function(){
    console.log(`server is listening at ${port}`);
})