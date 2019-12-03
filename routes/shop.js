'use strict'

const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const fs = require('fs');
router.get('/', (req, res) => {
    Product.find({ }).exec((err, products) => {
      res.render('shop/products', { products: products });
    } )
});

router.get('/product/:productId', (req, res) => {
  res.redirect('/shop')
});

router.get('/product/:productId/add', (req, res) => {
    if(req.session.userId){
      req.session.products.push(req.params.productId)
    }
    res.redirect('/shop')
});

router.get('/basket', (req, res) => {
  Product.find({ _id: req.session.products }, (err, products) =>{
    res.render('shop/basket', { products: products });
  })
});

module.exports = router