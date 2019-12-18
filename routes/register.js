'use strict'

const express = require('express')
const router = express.Router()
const User = require('../models/user')
const nodemailer = require ('nodemailer')

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

    if(checkUsername(data.username) &&
    checkPassword(data.password) &&
    checkPasswordConfirmation(data.password, req.body.passwordConfirmation) &&
    checkEmail(data.email)){
        data['verify'] = (Math.random() * 10000).toPrecision(4)
        User.create(data, (err, user) => {
            if(err){
                res.redirect('/')
            }
            else {
                nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'thecreatorivan@gmail.com',
                        pass: 'W3t-RPp-QDX-Rgx',
                    }
                }).sendMail({
                    from:'thecreatorivan@gmail.com',
                    to: user.email,
                    subject:'You must confirm your account',
                    text:'Подтвердите свой аккаунт: 127.0.0.1:3000/register/' + user._id + '/' + user.verify
                })
                req.session.userId = user._id
                res.redirect('/')
            }    
        })
    }
})

router.get('/:userId/:verification', (req, res) => {
    User.findById(req.params.userId, (err, user) =>{
        if(user.verify === req.params.verification){
            const data = {
                permissions: {
                    manageBlog: true,
                    manageShop: false,
                    manageUsers: false,
                }
            }
            User.updateOne(user, data, (err, user) => {
                res.redirect('/blog')
            })
        }
    })
})

module.exports = router
