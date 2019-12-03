'use strict';

const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: false,
    required: true,
    trim: true,
  },
  type: { 
    type: String,
    required: true,
  },
  size: {
    type: String
  },
  quantity:{
    type: Number
  },
  price:{
    type: Number,
    required: true,
  },
  color:{
    type: String
  },
  colorAdditional:{
    type: String
  },
  description:{
    type: String,
    required: true,
  },
  madeFrom:{
    type: String
  },
  imagePath: {
    type: String,
  }
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;