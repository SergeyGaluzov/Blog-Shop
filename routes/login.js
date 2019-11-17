'use strict'

const express = require('express')
const router = express.Router()
const User = require("../models/user")



router.get("/", (req, res) => {
    User.findById(req.session.userId, (err, user) => {
        res.render("login_test", {"username": user ? user.username : "anon"})
    });
})

const checkPassword = password => { if(password) return password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i) !== null}
const checkEmail = email => { if(email) return email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i) !== null }
const checkPasswordConfirmation = (password, passwordConfirmation) => password === passwordConfirmation
const checkUsername = username => {if(username) return username.match(/^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/i) !== null}
  
router.post("/", (req, res) => {
    const data = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        isAdmin: false,
    }
    if(checkUsername(data.username) &&
    checkPassword(data.password) &&
    checkPasswordConfirmation(data.password, req.body.passwordConfirmation) &&
    checkEmail(data.email)){
        User.create(data, (err, user) => {
            if(err){
                res.render('login_test', { "username": "anon", "error": "Error creating user. Try again." })
            }
            else {
                req.session.userId = user._id
                res.render('login_test', { "username": user.username })
            }
                
        })
    }
    if(req.body.usernameLogin && req.body.passwordLogin){
        User.authenticate(req.body.usernameLogin, req.body.passwordLogin, user =>{
            if(user){
                req.session.userId = user._id;
                res.render("login_test", {"username": user.username})
            }
            else{
                res.render("login_test", {"error": "Failed"})
            }
        })
    }
})

router.get("/logout", (req, res) =>{
    if(req.session)
        req.session.destroy(err =>{
            res.redirect("/login")
        })
})

module.exports = router