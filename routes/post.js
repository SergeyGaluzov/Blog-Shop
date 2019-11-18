'use strict';

const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');

router.get('/', function(request, response) {
  if (request.session.userId) {
    response.render("post_template.pug");
  }
});

router.post('/', function(request, response){
  const postInfo = {
    userID: request.session.userId, 
    text: request.body.post_text,
    date: new Date(),
  };
  console.log(postInfo)
  Post.create(postInfo, (err, post) => {
    Post.find({}, function(err, posts) {
      const postMap = [];
      posts.forEach(function(post){
        const post_serialized = {
          userID: post.userID, 
          text: post.text,
          date: post.date,
        };
        postMap.push(post_serialized);
      })
      response.render("posts.pug", {'posts': postMap});
    });
  })
});

module.exports = router