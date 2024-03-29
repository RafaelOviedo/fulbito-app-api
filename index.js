const express = require('express');
const mongoose = require('mongoose');
const routes = require('./src/routes/index');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
// const port = 3001;
const second_port = 8080;

dotenv.config();

mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.gcgueba.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);

app.use(cors());
app.use(express.json())

app.use('/', routes);

app.listen(second_port, () => {
  console.log('running on port 8080');
})
 
module.exports = app;