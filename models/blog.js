const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const BlogSchema = mongoose.Schema({
  title: {
    type: String
  },
  post: {
    type: String
  }
});

const Blog = module.exports = mongoose.model('Blog', BlogSchema);

module.exports.getUserById = function(id, callback){
  Blog.findById(id, callback);
}

module.exports.getBlogByTitle = function(title, callback){
  const query = {title: title}
  Blog.findOne(query, callback);
}

module.exports.addBlog = function(newBlog, callback){
  newBlog.save(newBlog);
}
