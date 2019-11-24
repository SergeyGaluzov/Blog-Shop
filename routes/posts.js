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
    callback(null, 'img/uploaded/')
  },
  filename: (req, file, callback) =>{
    const splittedType = file.mimetype.split('/')
    const extension = splittedType[splittedType.length - 1]
    callback(null, Date.now() + '.' + extension)
  }
})
const upload = multer({ storage: storage })


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

router.get('/:postId/edit', function(req, response) { 
    Post.findById(req.params.postId).populate('user').exec((error, post) =>{
      response.render('blog/editpost', { post: post, isLoggedIn: req.session.userId ? true : false });
    })
});

router.post('/:postId/edit', upload.single('postImage'), function(req, response){
    User.findById(req.session.userId, (err, user) =>{
      const postedit = {
        title: utils.capitalize(req.body.title),
        text: req.body.text,
        imagePath: req.file ? req.file.path.replace('static\\', '') : undefined,
      };
      Post.findByIdAndUpdate(req.params.postId, postedit, {new: true}, (err,res) => {response.redirect('/posts');});
    })
  });

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
    else if (req.body.edit) {
        res.redirect(req.params.postId + '/edit');
    }
})

module.exports = router
