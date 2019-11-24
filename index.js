'use strict'

const express = require('express')
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
const logoutRouter = require('./routes/logout')
const registerRouter = require('./routes/register')
const newpostRouter = require('./routes/newpost')
const postsRouter = require('./routes/posts')
const editpostRouter = require('./routes/editpost')

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://vlad:eRNJy7BR8PSSqYnd@cluster0-ip7bm.mongodb.net/test?retryWrites=true&w=majority')
const database = mongoose.connection

database.on('error', error => console.error(error))
database.once('open', function(){})

app.use(express.static(path.join(__dirname, '/static')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/logout', logoutRouter)
app.use('/newpost', newpostRouter)
app.use('/posts', postsRouter)
app.use('/editpost', editpostRouter)

app.listen(3000);
