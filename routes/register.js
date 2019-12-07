'use strict'

const express = require('express')
const router = express.Router()
const User = require('../models/user')
const mailer = require('./mailer')

router.get('/', (req, res) => {
    if(req.session.userId === undefined)
        res.render('authorization/register', { isLoggedIn: req.session.userId ? true : false })
    else
        res.redirect('/newpost')
})

const checkPassword = password => { if(password) return password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i) !== null}
const checkEmail = email => { if(email) return email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i) !== null }
const checkPasswordConfirmation = (password, passwordConfirmation) => password === passwordConfirmation
const checkUsername = username => {if(username) return username.match(/^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/i) !== null}

router.post('/', (req, res) => {
    const data = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        permissions:{
            manageBlog: false,
            manageShop: false,
            manageUsers: false, 
        }
    }
    console.log(checkUsername(data.username),
    checkPassword(data.password),
    checkPasswordConfirmation(data.password, req.body.passwordConfirmation),
    checkEmail(data.email))
    if(checkUsername(data.username) &&
    checkPassword(data.password) &&
    checkPasswordConfirmation(data.password, req.body.passwordConfirmation) &&
    checkEmail(data.email)){
        User.create(data, (err, user) => {
            console.log(err, user)
            if(err){
                res.redirect('/')
            }
            else {
                // req.session.userId = user._id
                // // res.redirect('/')
                const message = {
                    from:'Mailer Test <gladys.turner@ethereal.email>',
                    to: req.body.email,
                    subject:'You must confirm your account',
                    text:'Подтвердите свой аккаунт'
                }

                mailer(message)
                req.session.userId = user._id
                res.redirect('/')
            }    
        })
    }
})

module.exports = router