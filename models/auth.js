const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 6

const userSchema = new Schema(
{
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  urlId: {
    type: String,
    trim: true,
    required: true,
    max: 14,
    unique: true,
    index: true,
    lowercase: true
  },
  role: {
    type: String,
    default: 'student'
  },
  resetPasswordLink: {
    data: String,
    default: ''
  },
},
{
    timestamps: true
})

userSchema.pre('save', function(next){
  const user = this;
  if(!user.isModified('password')) return next()
  bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash){
      if(err) return next(err)
      user.password = hash
      next()
  })
})

userSchema.methods.comparePassword = function(tryPassword, cb){
  bcrypt.compare(tryPassword, this.password, cb)
}

module.exports = mongoose.model('User', userSchema)