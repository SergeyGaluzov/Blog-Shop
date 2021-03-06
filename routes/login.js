'use strict'

const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', (req, res) => {
    if(req.session.userId === undefined)
        res.render('authorization/login', { isLoggedIn: req.session.userId ? true : false })
    else
        res.redirect('/newpost')
})
  
router.post('/', (req, res) => {
    if(req.body.username && req.body.password){
        User.authenticate(req.body.username, req.body.password, user =>{
            if(user){
                req.session.userId = user._id;
                res.redirect('/')
            }
            else{
                res.render('authorization/login', { isLoggedIn: req.session.userId ? true : false })
            }
        })
    }
})

module.exports = router