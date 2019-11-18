'use strict';
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  text: {
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