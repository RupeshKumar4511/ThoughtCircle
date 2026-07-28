const express = require('express');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const cookieparser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileupload = require('express-fileupload');
require('dotenv').config();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('node:path')
const dotenv = require('dotenv')
const app = express();
dotenv.config()

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(fileupload({
  useTempFiles: true,
}))

app.use(express.json());
app.use(cookieparser());
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/',async(req,res)=>{
  return res.status(200).send({title:"ThoughtCircle-Backend",Health:"Ok"})
})

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Backend API for a simple social-media web application',
    },
    servers: [
      {
        url: 'https://thoughtcircle.onrender.com'
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token', 
        },
      },
    },
  },
  apis: [
    path.join(__dirname, './routes/*.js'),
    path.join(__dirname, './models/*.js')
  ],  
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes)

module.exports = app