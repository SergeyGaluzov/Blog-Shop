'use strict';

const express = require('express')
const router = express.Router()
const utils = require('../util/utils')
const Product = require('../models/product')

const multer  = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, callback) =>{
    callback(null, 'static/img')
  },
  filename: (req, file, callback) =>{
    const splittedType = file.mimetype.split('/')
    const extension = splittedType[splittedType.length - 1]
    callback(null, Date.now() + '.' + extension)
  }
})
const upload = multer({ storage: storage })

router.get('/', function(req, response) { 
    response.render('shop/newproduct');
});

router.post('/', upload.single('productImage'), function(req, response){
    const productInfo = {
        title: utils.capitalize(req.body.title),
        type: req.body.type,
        size: req.body.size,
        description: req.body.description,
        imagePath: req.file ? req.file.path.replace('static', '') : undefined,
    };
    Product.create(productInfo, (err, post) => {
      response.redirect('/shop');
    })
});
module.exports = router