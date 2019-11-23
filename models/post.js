'use strict';

const mongoose = require('mongoose')

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
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    day: { type: String, required: true },
    month: { type: String, required: true },
    year: { type: String, required: true },
    hours: { type: String, required: true },
    minutes: { type: String, required: true },
  },
  imagePath: {
    type: String,
  }
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;