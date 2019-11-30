'use strict';

const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  type: { 
    type: String
  },
  size: {
    type: String
  },
  description:{
    type: String
  },
  imagePath: {
    type: String,
  }
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;