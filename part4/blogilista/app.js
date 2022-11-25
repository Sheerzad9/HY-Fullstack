const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const mongoose = require("mongoose")

if (config.MONGODB_URI_WITH_PWD) {
  mongoose.connect(config.MONGODB_URI_WITH_PWD);
  console.log('DB connected to: ', config.MONGODB_URI_WITH_PWD);
} else {
  console.log('NO MONGODB URL FOUND!!!');
}

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

app.use('/api/blogs', blogsRouter);

module.exports = app;
