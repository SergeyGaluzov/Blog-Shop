const express = require("express")
const app = express()
const path = require('path')

const indexRouter = require('./routes/index')

app.use(express.static(__dirname))

app.set('views', path.join(__dirname, 'views'))
app.set("view engine", "pug");

app.use('/', indexRouter)

app.listen(3000)