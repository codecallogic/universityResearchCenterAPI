const User = require('../models/auth')
const jwt = require('jsonwebtoken')
const aws = require('aws-sdk')
const {resetPasswordEmail} = require('../templates/resetPassword')

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})

const ses = new aws.SES({ apiVersion: '2010-12-01'})

exports.read = (req, res) => {
  console.log(req)
  User.findOne({_id: req.user._id}, (err, user) => {
    console.log(err)
    if(err) return res.status(401).json('User not found')
    res.json('Logged in')
  })
}

exports.userInfo = (req, res) => {
  User.findById(req.body.user._id, (err, user) => {
    if(err) return res.status(401).json('User not found')
    return res.json({firstName: user.firstName, lastName: user.lastName, username: user.username, email: user.email})
  })
}

exports.updateUserInfo = (req, res) => {
  for(let key in req.body.user){
    if(!req.body.user[key]) delete req.body.user[key]
  }
  User.findByIdAndUpdate(req.body.account._id, req.body.user, {new: true}, (err, user) => {
    if(err) return res.status(401).json('User was not updated')
    return res.json(user)
  })
}

exports.userResetPasswordEmail = (req, res) => {

  const token = jwt.sign({username: req.body.user.username, email: req.body.user.email, id: req.body.user._id}, process.env.JWT_RESET_PASSWORD, {expiresIn: '24hr'})
  
  const params = resetPasswordEmail(req.body.email, token)

  const sendEmailOnInvite = ses.sendEmail(params).promise()

  sendEmailOnInvite
    .then( data => {
        console.log('Email submitted on SES', data)
        return res.json(`Reset password link was sent to ${req.body.email}`)
  })
  .catch( err => {
      console.log('SES email on register', err)
      return res.status(400).json('We could not verify email address of user, please try again')
  })
}