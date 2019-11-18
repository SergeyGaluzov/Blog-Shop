'use strict'

const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const User = require('../models/user')

const getPosts = (req, res) => {
    Post.find({}, (err, posts) => {
        res.render('posts', {"posts": posts})
        })
    }

router.post('/', getPosts)
router.get('/', getPosts)



module.exports = router
