
// Dependencies
const express = require('express');
const path = require("path");
const fs = require('fs');
const bodyParser = require('body-parser');


const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./database-config/database');

// User Schema
const BlogSchema = mongoose.Schema({
  title: {
    type: String
  },
  post: {
    type: Object
  },
  id: {
    type: String
  }
});

var Blog = mongoose.model('Blog', BlogSchema);

// Connect To Database
mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useMongoClient: true });

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set('port', (process.env.PORT || 7070))

// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// For Rendering HTML
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + 'index.html'));
})

app.listen(app.get('port'), function () {
  console.log("Node app is running at http://localhost:" + app.get('port'))
})


app.post('/addBlog', function (req, res) {
  console.log("addBlog post request received");
  let blogData = req.body;
  console.log(blogData);
  let newBlog = new Blog(blogData);
  console.log(blogData);

  newBlog.save(function (err) {
    if (err) return console.error(err);
    console.log('successfully saved new blog!')
  });

  res.send({success: true});
})

app.get('/getBlogs', function (req, res) {
  console.log('data post request received');
  Blog.find(function (err, blogs) {
    if (err) return console.error(err);
    console.log(blogs);
    res.send({success: true, blogs: blogs});
  })
})

app.post('/deleteBlog', function (req, res) {
  console.log("deleteBlog post request received");
  let id = req.body;
  console.log(id);

  Blog.deleteOne(id, function (err) {
    if (err) return console.error(err);
    console.log('successfully deleted the blog!')
  }); 

  res.send({success: true});
})