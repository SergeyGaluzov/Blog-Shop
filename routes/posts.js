'use strict'

const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const User = require('../models/user')

const getPosts = (req, res) => {
    Post.find({}, (err, posts) => {
        const postMap = [];
          posts.forEach(function(post){
            const post_serialized = {
              userID: post.userID, 
              text: post.text,
              date: post.date,
            };
            postMap.push(post_serialized);
          })
        res.render('posts', {"posts": postMap})
        })
    }

router.post('/', getPosts)
router.get('/', getPosts)



module.exports = router
