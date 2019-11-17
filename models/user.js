'use strict'
const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,   
        required: true,
        trim: true
      },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
      },
    password: {
        type: String,
        required: true,
      },
    isAdmin: {
        type: Boolean,
    }
})

UserSchema.pre('save', function(next){
  let user = this
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash
    next()
  })
})

const User = mongoose.model('User', UserSchema)

module.exports = User;