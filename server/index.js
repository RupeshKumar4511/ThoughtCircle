const express = require('express');
const app = express();
const userRoutes = require('./routes/user-routes');
const postRoutes = require('./routes/post');
const cookieparser = require('cookie-parser');
const bodyParser = require('body-parser');
const ensureAuthenticated = require('./Middlewares/Auth');
const connectedDB =  require('./config/db');
const cors = require('cors');
const fileupload = require('express-fileupload');
require('dotenv').config();
const port = process.env.PORT;

app.use(cors({
    origin: "http://localhost:5173",  
    credentials: true
  }));

app.use(fileupload({
  useTempFiles:true,
}))

app.use(express.json());
// app.use(cors())
app.use(cookieparser());
app.use(bodyParser.urlencoded({extended:true}))



// app.use('/',path.join(__dirname,'public'));


app.use(userRoutes);
app.use(postRoutes)

app.listen(port,function(){
    console.log(`server is listening at ${port}`);
})