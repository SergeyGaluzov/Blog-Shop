'use strict'

const express = require('express')
const router = express.Router()
const Product = require('../models/product')

router.get('/', (req, res) => {
    Product.find({ }).exec((err, products) => {
      res.render('shop/products', { products: products });
    } )
});

module.exports = router