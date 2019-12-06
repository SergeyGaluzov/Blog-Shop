'use strict'

const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const fs = require('fs');

router.get('/', (req, res) => {
    Product.find({ }).exec((err, products) => {
      res.render('shop/products', { products: products, isLoggedIn: req.session.userId ? true : false });
    } )
});

router.get('/product/:productId', (req, res) => {
  res.redirect('/shop')
});

router.get('/product/:productId/add', (req, res) => {
  const product = req.params.productId
  if(req.session.userId){
    const products = req.session.products
    const qties = req.session.qties
    const productNumber = products.findIndex(value => value === product)
    if(productNumber === -1) {
      products.push(product)
      qties.push(1)
    }
    else {
      qties[productNumber]++
    }
  }
  res.redirect('/shop')
});

router.get('/basket', (req, res) => {
  Product.find({ _id: req.session.products }, (err, products) =>{
    res.render('shop/basket', { products: products, qties: req.session.qties, isLoggedIn: req.session.userId ? true : false });
  })
});

module.exports = router