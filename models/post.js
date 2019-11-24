'use strict';

const mongoose = require('mongoose')
const fs = require('fs')

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
  comments: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Comment'}],
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

PostSchema.pre('deleteOne', function(next){
  const imagePath = this.getFilter().imagePath
  if(imagePath){
     fs.unlinkSync('static\\' + imagePath)
  }
  Post.model('Comment').deleteMany({ post: this.getFilter()._id }, next)
})

PostSchema.pre('updateOne', function(next){
  const oldImage = this.getFilter().imagePath
  const newImage = this.getUpdate().imagePath
  if(newImage !== undefined && oldImage !== undefined){
    fs.unlinkSync('static\\' + oldImage)
  }
  next()
})


const Post = mongoose.model('Post', PostSchema);
module.exports = Post;