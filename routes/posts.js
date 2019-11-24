'use strict'

const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const Comment = require('../models/comment')
const utils = require('../util/utils')

router.get('/', (req, res) => {
    Post.find({ }).populate('user').exec((err, posts) => {
        res.render('blog/posts', { posts: posts, isLoggedIn: req.session.userId ? true : false })
    })
})

router.get('/:postId', (req, res) => {
    Post.findById(req.params.postId).populate('user').
    populate({ 
        path: 'comments', 
        populate: { path: 'user' },
    }).exec((error, post) => {
        res.render('blog/post', { post: post, isLoggedIn: req.session.userId ? true : false });
    })
})

router.post('/:postId', (req, res) =>{
    if(req.body.delete){
        Post.findById(req.params.postId, (err, post) =>{
            Post.deleteOne(post, (err) =>{
                res.redirect('/posts');
            })
        })
    }
    else if(req.body.comment){
        Post.findById(req.params.postId, (err, post) =>{
            const comment = new Comment({
                user: req.session.userId,
                text: req.body.comment,
                date: utils.dateHandler(new Date()),
                post: post,
            })
            comment.save((err, comment) => {
                post.comments.push(comment)
                post.save((err, postUpdated) =>{
                    res.redirect('/posts/' + postUpdated._id)
                })
            })
        })
    }
})

module.exports = router
