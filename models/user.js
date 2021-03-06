'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,   
        required: true,
        trim: true,
      },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
      },
    password: {
        type: String,
        required: true,
      },
    permissions: {
      manageBlog: { type: Boolean },
      manageShop: { type: Boolean },
      manageUsers: { type: Boolean },
    }
})

UserSchema.pre('save', function(next){
  let user = this
  console.log('here')
  bcrypt.hash(user.password, 10, (error, hash) => {
    console.log('now here')
    user.password = hash
    next()
  })
})

UserSchema.statics.authenticate = function (username, password, callback) {
  User.findOne({ 'username': username })
    .exec(function (err, user) {
      if(user === null)
        return callback(null)
      bcrypt.compare(password, user.password, function(err, result){
        if (result === true){
          return callback(user)
        }
        else
          return callback(null)
      })
  })
}

const User = mongoose.model('User', UserSchema)

module.exports = User;