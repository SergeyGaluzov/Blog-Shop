'use strict';

const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const User = require('../models/user')

const multer  = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, callback) =>{
    callback(null, "img/uploaded/")
  },
  filename: (req, file, callback) =>{
    const splittedType = file.mimetype.split("/")
    const extension = splittedType[splittedType.length - 1]
    callback(null, Date.now() + '.' + extension)
  }
})
const upload = multer({ storage: storage })

router.get('/', function(req, response) { 
  response.render("blog/newpost", {isLoggedIn: req.session.userId ? true : false});
});

router.post('/', upload.single('postImage'), function(req, response){
  User.findById(req.session.userId, (err, user) =>{
    const postInfo = {
      userID: user._id,
      username: user.username, 
      text: req.body.text,
      title: req.body.title,
      date: new Date(),
      imagePath: req.file ? req.file.path : undefined,
    };
    Post.create(postInfo, (err, post) => {
      response.redirect("/posts");
    })
  })
});

module.exports = router