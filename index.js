const express = require('express');
const mongoose = require('mongoose');
const routes = require('./src/routes/index');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const port = 3001;
const cloudinary = require('cloudinary').v2;

dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// PRODUCTION CLUSTER
mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.gcgueba.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);

// DEVELOPMENT (TESTING) CLUSTER
// mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster1.2u0cwi1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`);

app.use(cors());
app.use(express.json())

app.use('/', routes);

app.listen(port, () => {
  console.log('running on port 3001');
})
 
module.exports = app;