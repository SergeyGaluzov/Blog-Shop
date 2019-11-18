'use strict';

const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');


router.get('/', function(request, response) { 
  response.render("post_template.pug", {isLoggedIn: request.session.userId ? true : false});
});

router.post('/', function(request, response){
  User.findById(request.session.userId, (err, user) =>{
    const postInfo = {
      userID: user._id,
      username: user.username, 
      text: request.body.text,
      title: request.body.title,
      date: new Date(),
    };
    Post.create(postInfo, (err, post) => {
      response.redirect(307, "/posts");
    })
  })
});

module.exports = router