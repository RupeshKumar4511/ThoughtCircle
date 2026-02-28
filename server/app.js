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

const app = express();

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
  },
  apis: ['./routes/*.js', './models/*.js'], 
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes)

module.exports = app