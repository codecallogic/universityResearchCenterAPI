const User = require('../models/auth')
const jwt = require('jsonwebtoken')
const aws = require('aws-sdk')
const {resetPasswordEmail} = require('../templates/resetPassword')
const {changeEmailTemplate} = require('../templates/changeEmail')

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

exports.userChangePassword = (req, res) => {
  jwt.verify(req.body.token, process.env.JWT_RESET_PASSWORD, (err, decoded) => {
  if(err) return res.status(400).json('This url has expired, please submit another request.')
    User.findById(req.body.user.id, (err, user) => {
      console.log(err)
      if(err) return res.status(401).json('User does not exits, please register first')
      user.comparePassword(req.body.currentPassword, (err, isMatch) => {
        if(!isMatch) return res.status(401).json('Current password does not match our records')
        if(isMatch){
          User.findByIdAndUpdate(req.body.user.id, {password: req.body.password}, (err, newUser) => {
            newUser.password = req.body.password
            newUser.save((err, updatedUser) => {
              if(err) return res.status(401).json('There was error updating your password, please try again later')
              res.clearCookie('user')
              res.clearCookie('accessToken')
              return res.json(`Password has changed, please login with new password`)
            })
          })
        }
      })
    })
  })
}

exports.userChangeEmail = (req, res) => {
  
  const token = jwt.sign({username: req.body.user.username, email: req.body.email, id: req.body.user._id}, process.env.JWT_CHANGE_EMAIL, {expiresIn: '24hr'})
  const params = changeEmailTemplate(req.body.user.email, req.body.email, token)

  const sendEmail = ses.sendEmail(params).promise()

  sendEmail
    .then( data => {
        console.log('Email submitted on SES', data)
        return res.json(`Change email confirmation was sent to ${req.body.email}`)
  })
  .catch( err => {
      console.log('SES email on register', err)
      return res.status(400).json('We could not verify email address of user, please try again')
  })
}

exports.updateEmail = (req, res) => {
  jwt.verify(req.body.token, process.env.JWT_CHANGE_EMAIL, (err, decoded) => {
    console.log(err)
    if(err) return res.status(401).json('This url has expired, please submit another request.')
    User.findByIdAndUpdate(req.body.user.id, {email: req.body.user.email}, {new: true}, (err, user) => {
      if(err) return res.status(401).json('There was an error updating your email')
      return res.json(`Your email has changed to ${req.body.user.email}`)
    })
  })
}