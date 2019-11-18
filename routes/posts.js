'use strict'

const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const User = require('../models/user')
const utils = require('../util/utils')


router.get('/', (req, res) => {
    Post.find({}, (err, posts) => {
        const postsData = posts.map(post => {
            return {
                username: utils.capitalize(post.username),
                date: utils.dateHandler(post.date),
                text: post.text,
                title: utils.capitalize(post.title),
            }
        })
        res.render('blog/posts', { "posts": postsData, })
        })
    })



module.exports = router
