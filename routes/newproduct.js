'use strict';

const express = require('express')
const router = express.Router()
const utils = require('../util/utils')
const Product = require('../models/product')
const fs = require('fs');

const multer  = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, callback) =>{
    callback(null, 'static/img/uploaded')
  },
  filename: (req, file, callback) =>{
    const splittedType = file.mimetype.split('/')
    const extension = splittedType[splittedType.length - 1]
    callback(null, Date.now() + '.' + extension)
  }
})
const upload = multer({ storage: storage })

router.get('/', function(req, response) { 
    const data = fs.readFileSync('shop/product.csv');
    const file = data.toString().split('\r\n').filter(i => i);
    const properties = file.shift().split(',');
    let product;
    let i = 0;
    while (file.length) {
      console.log(file);
      product = file.shift().split(',');
      const productInfo = {
        name: null, 
        type: null,
        size: null,
        quantity: null,
        price: null,
        color: null,
        colorAdditional: null,
        description: null,
        madeFrom: null,
        imagePath: null,
      };
      for (var key in productInfo) {
        productInfo[key] = product[i];
        i++;
      }
      i = 0;
      console.log(productInfo);
      Product.create(productInfo);
    }
    response.redirect('/shop');
});

router.post('/', upload.single('productImage'), function(req, response){
    // const productInfo = {
    //     title: utils.capitalize(req.body.title),
    //     type: req.body.type,
    //     size: req.body.size,
    //     description: req.body.description,
    //     imagePath: req.file ? req.file.path.replace('static', '') : undefined,
    // };
});

module.exports = router