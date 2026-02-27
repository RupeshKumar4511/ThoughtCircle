const express = require('express');
const app = express();
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const cookieparser = require('cookie-parser');
const bodyParser = require('body-parser');
const connectedDB = require('./config/db');
const cors = require('cors');
const fileupload = require('express-fileupload');
require('dotenv').config();
const port = process.env.PORT;

app.use(cors({
  origin: 'https://thoughtcircle-frontend.onrender.com',
  credentials: true
}));

app.use(fileupload({
  useTempFiles: true,
}))

app.use(express.json());
app.use(cookieparser());
app.use(bodyParser.urlencoded({ extended: true }))




app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes)

app.listen(port, function () {
  console.log(`server is listening at ${port}`);
})