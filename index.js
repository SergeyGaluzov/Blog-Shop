'use strict'

const express = require('express')
const PORT = process.env.PORT || 3000;
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
const profileRouter = require('./routes/profile')
const editpostRouter = require('./routes/editpost')
const shopRouter = require('./routes/shop')
const newproductRouter = require('./routes/newproduct')

const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/kpi', {useNewUrlParser: true})
// mongoose.connect('mongodb+srv://vlad:eRNJy7BR8PSSqYnd@cluster0-ip7bm.mongodb.net/test?retryWrites=true&w=majority')
mongoose.connect('mongodb+srv://Sergey:Sergey200156@cluster0-ip7bm.mongodb.net/test?retryWrites=true&w=majority')
const database = mongoose.connection

database.on('error', error => console.error(error))
database.once('open', function(){})

app.use(express.static(path.join(__dirname, 'static')))

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
app.use('/profile', profileRouter)
app.use('/editpost', editpostRouter)
app.use('/shop', shopRouter)
app.use('/shop/newproduct', newproductRouter)

app.listen(PORT);
