'use strict'

const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const Comment = require('../models/comment')
const User = require('../models/user')
const utils = require('../util/utils')

const multer  = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, callback) =>{
    callback(null, 'static/img/uploaded/')
  },
  filename: (req, file, callback) =>{
    const splittedType = file.mimetype.split('/')
    const extension = splittedType[splittedType.length - 1]
    callback(null, Date.now() + '.' + extension)
  }
})
const upload = multer({ storage: storage })


router.get('/', (req, res) => {
    Post.find({ }).sort('-date').populate('user').exec((err, posts) => {
        res.render('blog/posts', { posts: posts, isLoggedIn: req.session.userId ? true : false })
    })})

router.get('/post/:postId', (req, res) => {
    Post.findById(req.params.postId).populate('user').
    populate({ 
        path: 'comments', 
        populate: { path: 'user' },
    }).exec((error, post) => { 
        const canEdit = post.user._id == req.session.userId
        const isLoggedIn = req.session.userId ? true : false
        res.render('blog/post', { 
            post: post,
            isLoggedIn: isLoggedIn,
            canEdit: canEdit,
        });
    })
})

router.get('/:pageNumber', (req, res) => {
  Post.find({ }).sort({date: -1}).populate('user').exec((err, posts) => {
    res.render('blog/posts', { posts: posts, pageNumber: req.params.pageNumber, isLoggedIn: req.session.userId ? true : false})
})
})

router.get('/:postId/edit', function(req, response) { 
    Post.findById(req.params.postId).populate('user').exec((error, post) =>{
        const canEdit = post.user._id == req.session.userId
        if(canEdit)
            response.render('blog/editpost', { post: post, isLoggedIn: req.session.userId ? true : false });
        else
            response.redirect('/posts/post/' + req.params.postId)
    })
});

router.post('/post/:postId/edit', upload.single('postImage'), function(req, res){
    Post.findById(req.params.postId, (err, post) => {
        const postEdit = {
            title: utils.capitalize(req.body.title),
            text: req.body.text,
            imagePath: req.file ? req.file.path.replace('static', '') : post.imagePath, 
        };
        Post.updateOne(post, postEdit, (err) => {
            res.redirect('/posts/post/' + req.params.postId);
        })
    });
})

router.get('/post/:postId/delete', (req, res) =>{
    Post.findById(req.params.postId, (err, post) =>{
        const canEdit = post.user._id == req.session.userId
        if(canEdit){
            Post.deleteOne(post, (err) =>{
                res.redirect('/posts')
            })
        }
        else{
            res.redirect('/posts/post/' + req.params.postId)
        }
    })
})

router.post('/post/:postId', (req, res) =>{
    if(req.body.comment) {
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
                    res.redirect('/posts/' + req.params.postId)
                })
            })
        })
    }
    else {
        res.redirect('/posts/' + req.params.postId)
    }
})

module.exports = router
