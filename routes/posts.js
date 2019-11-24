'use strict'

const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const fs = require('fs')



router.get('/', (req, res) => {
    Post.find({ }).populate('user').exec((err, posts) => {
        res.render('blog/posts', { posts: posts, isLoggedIn: req.session.userId ? true : false })
    })
})

router.get('/:postId', (req, res) => {
    Post.findById(req.params.postId).populate('user').exec((error, post) =>{
        res.render('blog/post', { post: post, isLoggedIn: req.session.userId ? true : false });
    })
})

router.post('/:postId', (req, res) =>{
    if(req.body.delete){
        Post.findByIdAndDelete(req.params.postId, (err, post) =>{
            const imagePath = post.imagePath
            if(imagePath){
                fs.unlinkSync(imagePath)
            }
            res.redirect('/posts');
        })
    }
})

module.exports = router
