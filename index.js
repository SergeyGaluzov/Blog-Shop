'use strict'

const express = require("express")
const app = express()

const path = require('path')
const bodyParser = require('body-parser')

const session = require('express-session')
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
  }));

const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login')
const postRouter = require('./routes/post')

const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://vlad:eRNJy7BR8PSSqYnd@cluster0-ip7bm.mongodb.net/test?retryWrites=true&w=majority')
const database = mongoose.connection

database.on('error', error => console.error(error))
database.once('open', function(){})

app.use(express.static(__dirname))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/newpost', postRouter);

app.listen(3000);
