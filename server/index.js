const connectedDB = require('./config/db');
const app = require('./app.js')
require('dotenv').config();

const port = process.env.PORT;

app.listen(port, function () {
  console.log(`server is listening at ${port}`);
})