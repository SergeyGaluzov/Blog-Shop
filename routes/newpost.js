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

router.get('/', function(request, response) { 
  response.render("blog/newpost", {isLoggedIn: request.session.userId ? true : false});
});

router.post('/', upload.single('postImage'), function(request, response){
  console.log(request.file)
  User.findById(request.session.userId, (err, user) =>{
    const postInfo = {
      userID: user._id,
      username: user.username, 
      text: request.body.text,
      title: request.body.title,
      date: new Date(),
      imagePath: request.file.path,
    };
    Post.create(postInfo, (err, post) => {
      response.redirect("/posts");
    })
  })
});

module.exports = router