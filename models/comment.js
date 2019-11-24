'use strict';

const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
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
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;