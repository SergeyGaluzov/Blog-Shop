'use strict';
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  text: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  username:{
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  userID: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    unique: false,
    required: true,
    trim: true
  }
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;