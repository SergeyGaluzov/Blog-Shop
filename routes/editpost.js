'use strict';

const express = require('express')
const router = express.Router()
const Post = require('../models/post')
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

router.get('/:postId', function(req, response) { 
  Post.findById(req.params.postId).populate('user').exec((error, post) =>{
    response.render('blog/editpost', { post: post, isLoggedIn: req.session.userId ? true : false });
  })}
);

router.post('/:postId', upload.single('postImage'), function(req, response){
  User.findById(req.session.userId, (err, user) =>{
    const postedit = {
      user: user, 
      title: utils.capitalize(req.body.title),
      text: req.body.text,
      date: utils.dateHandler(new Date()),
      imagePath: req.file ? req.file.path.replace('static\\', '') : undefined,
    };
    Post.findByIdAndUpdate(req.params.postId, postedit, {new: true}, (err,res) => {response.redirect('posts');});
  })
});

module.exports = router