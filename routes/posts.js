'use strict'

const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const User = require('../models/user')
const utils = require('../util/utils')


const getPosts = (req, res) => {
    Post.find({}, (err, posts) => {
        const postsData = posts.map(post => {
            return {
                username: utils.capitalize(post.username),
                date: utils.dateHandler(post.date),
                text: post.text,
                title: utils.capitalize(post.title),
            }
        })
        console.log(postsData)
        res.render('posts', { "posts": postsData, })
        })
    }

router.post('/', getPosts)
router.get('/', getPosts)



module.exports = router
