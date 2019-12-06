'use strict';

const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const User = require('../models/user')

const utils = require('../util/utils')

const multer  = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, callback) =>{
    callback(null, 'static/img/uploaded')
  },
  filename: (req, file, callback) =>{
    const splittedType = file.mimetype.split('/')
    const extension = splittedType[splittedType.length - 1]
    callback(null, Date.now() + '.' + extension)
  }
})
const upload = multer({ storage: storage })

router.get('/', function(req, response) { 
  if(req.session.userId){
    User.findById(req.session.userId, (err, user) =>{
      if(user.permissions.manageBlog)
        response.render('blog/newpost', {isLoggedIn: req.session.userId ? true : false});
      else
        response.redirect('/posts')
    })
  }
});

router.post('/', upload.single('postImage'), function(req, response){
  User.findById(req.session.userId, (err, user) =>{
    const postInfo = {
      user: user, 
      text: req.body.text,
      title: utils.capitalize(req.body.title),
      date: utils.dateHandler(new Date()),
      imagePath: req.file ? req.file.path.replace('static', '') : undefined,
    };
    Post.create(postInfo, (err, post) => {
      response.redirect('/posts');
    })
  })
});

module.exports = router