'use strict'

const express = require('express')
const router = express.Router()

router.get('/', function(req, response){
    response.render('main', {title: 'Главная Страница'});
}); 

module.exports = router