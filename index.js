const express = require('express');
const mongoose = require('mongoose');
const routes = require('./src/routes/index');
const dotenv = require('dotenv');
const app = express();
const port = 3000;

dotenv.config();

mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.gcgueba.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);

app.use(express.json())

app.use('/', routes);

app.listen(port, () => {
  console.log('running on port 3000');
})
 
module.exports = app;