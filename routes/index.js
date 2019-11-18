'use strict'

const express = require('express')
const router = express.Router()

router.get("/", function(request, response){
    response.render("main", {title: "Главная Страница"});
  }); 

module.exports = router