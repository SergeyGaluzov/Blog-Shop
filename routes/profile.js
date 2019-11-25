'use strict'

const express = require('express')
const router = express.Router()
const User = require('../models/user') 

router.get('/', function(req, res){
    User.findById(req.session.userId, (err, user) =>{
        if(user === null)
            res.redirect('/login')
        else
            if (user.permissions.manageUsers)
                res.redirect('/profile/' + user._id + '/manageusers')
            else if (user.permissions.manageBlog)
                res.redirect('/profile/' + user._id + '/manageblog')
            else if (user.permissions.manageShop)
                res.redirect('/profile/' + user._id + '/manageshop')
            else
                res.redirect('/')
    })
})

router.get('/:userId/manageusers', (req, res) =>{
    const visitorId = req.session.userId
    const ownerId = req.params.userId
    if(visitorId === ownerId){
        User.find({ }, (err, users) => { 
            User.findOne({ _id: ownerId }, (err, owner) =>{
                res.render('profile/users', { userList: users, owner: owner })
            })
        })
    }
    else{
        res.redirect('/')
    }
})

router.get('/:userId/manageblog', (req, res) =>{
    res.redirect('/')
})

router.get('/:userId/manageshop', (req, res) =>{
    res.redirect('/')
})

module.exports = router