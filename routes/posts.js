'use strict'

const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const utils = require('../util/utils')
const fs = require('fs')

const getPostData = post => {
    return {
        username: utils.capitalize(post.username),
        date: utils.dateHandler(post.date),
        text: post.text,
        title: utils.capitalize(post.title),
        imagePath: post.imagePath ? post.imagePath : null,
        postId: post._id,
        userId: post.userID,
    }
}

router.get('/', (req, res) => {
    Post.find({}, (err, posts) => {
        const postsData = posts.map(post => getPostData(post))
        res.render('blog/posts', { 'posts': postsData, isLoggedIn: req.session.userId ? true : false })
    })
})

router.get('/:postId', (req, res) => {
    Post.findById(req.params.postId, (error, post) =>{
        const postData = getPostData(post)
        res.render('blog/post', {post: postData, isLoggedIn: req.session.userId ? true : false });
    })
})

router.post('/:postId', (req, res) =>{
    if(req.body.delete){
        Post.findByIdAndDelete(req.params.postId, (err, post) =>{
            const imagePath = getPostData(post).imagePath
            if(imagePath){
                fs.unlinkSync(imagePath)
            }
            res.redirect('/posts');
        })
    }
})

module.exports = router
