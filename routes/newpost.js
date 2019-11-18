'use strict';

const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/', function(request, response) { 
  response.render("post_template.pug", {isLoggedIn: request.session.userId ? true : false});
});

router.post('/', function(request, response){
  const postInfo = {
    userID: request.session.userId, 
    text: request.body.post_text,
    date: new Date(),
  };
  Post.create(postInfo, (err, post) => {
    response.redirect(307, "/posts");
  })
});

module.exports = router