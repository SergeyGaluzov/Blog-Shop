'use strict'

const express = require('express')
const router = express.Router()
const User = require('../models/user') 
const Post = require('../models/post')

router.get('/', function(req, res){
    User.findById(req.session.userId, (err, user) =>{
        if(user === null)
            res.redirect('/login')
        else
            if (user.permissions.manageUsers)
                res.redirect('/profile/' + user._id + '/manage')
            else if (user.permissions.manageBlog)
                res.redirect('/profile/' + user._id + '/posts')
            else if (user.permissions.manageShop)
                res.redirect('/profile/' + user._id + '/manageshop')
            else
                res.redirect('/')
    })
})

router.get('/:userId/manage', (req, res) =>{
    const visitorId = req.session.userId
    const ownerId = req.params.userId
    if(visitorId === ownerId){
        User.find({_id: { $nin: req.params.userId }}, (err, users) => { 
            User.findOne({ _id: ownerId }, (err, owner) =>{
                res.render('profile/users', { userList: users, owner: owner, isLoggedIn: req.session.userId ? true : false })
            })
        })
    }
    else{
        res.redirect('/')
    }
})

router.post('/:userId/manageusers', (req, res) =>{
    User.findOneAndUpdate({ username: req.body.username }, {permissions: req.body.permissions}, (err, user) =>{
        if(err){
            res.send('Error')
        }
        else {
            res.send(user)
        }
    })
})

router.get('/:userId/posts', (req, res) =>{
    const visitorId = req.session.userId
    const ownerId = req.params.userId
    const isOwner = req.session.userId === req.params.userId
    Post.find({ user: ownerId })
    .populate('user')
    .exec((err, posts) =>{
        User.findById(ownerId, (err, user) =>{
            if(user)
                res.render('profile/posts', { posts: posts, user: user, isOwner: isOwner})
        })
    })
    //res.redirect('/')
})

router.get('/:userId/manageshop', (req, res) =>{
    res.redirect('/')
})

module.exports = router