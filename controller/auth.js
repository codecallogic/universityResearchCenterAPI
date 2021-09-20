const User = require('../models/auth')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const shortId = require('shortid')
const expressJWT = require('express-jwt')
const nodemailer = require('nodemailer')
const mailgun = require('nodemailer-mailgun-transport')
const aws = require('aws-sdk')
const {inviteAdministratorEmail} = require('../templates/administrators')

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})

const ses = new aws.SES({ apiVersion: '2010-12-01'})

// TODO: Admin login functionality

// FIXME: Apply reCAPTCHA if customer is interested
exports.register = async (req, res) => {
  console.log(req.body)

  // Check if user is exists in database
  User.findOne({or: [{username: req.body.username, email: req.body.email}]}, (err, user) => {
    if(user) return res.status(400).json('Username or email already exists')

    // Generate token for new user
    
    const token = jwt.sign({username: req.body.username, email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName, role: req.body.role}, process.env.JWT_ACCOUNT_REGISTER, {expiresIn: '3hr'})

    // Send email with token url parameters for email confirmation and account activation

    const params = inviteAdministratorEmail(req.body.email, token, req.body.firstName)

    const sendEmailOnInvite = ses.sendEmail(params).promise()

    sendEmailOnInvite
      .then( data => {
          console.log('Email submitted on SES', data)
          return res.json(`Invite was sent to ${req.body.email}`)
    })
    .catch( err => {
        console.log('SES email on register', err)
        return res.status(400).json('We could not verify email address of user, please try again')
    })
    
  })
}

exports.activate = (req, res) => {
  const {token} = req.body
  const {username, email, password, firstName, lastName, role} = jwt.decode(token)
  
  jwt.verify(token, process.env.JWT_ACCOUNT_REGISTER, (err, decoded) => {
    if(err){
      return res.status(400).json('This url has expired please try signing up again.')
    }

    const urlId = shortId.generate()
    
    User.findOne({$or: [{email}, {username}]}, (err, user) => {
      if(user){
        console.log(err)
        return res.status(401).json('Email or username already exists')
      }

      const newUser = new User({username, email, password, firstName, lastName, urlId, role})
      newUser.save((err, result) => {
        if(err){
          console.log(err)
          return res.status(401).json('Could not register user')
        }

        if(result){
          const token = jwt.sign({_id: result._id}, process.env.JWT_SECRET, {expiresIn: '1hr', algorithm: 'HS256'})
          const {_id, username, firstName, email, role} = result
          const userClient = {_id, username, firstName, email, role}
          return res.status(202).cookie(
              "accessToken", token, {
              sameSite: 'strict',
              expires: new Date(new Date().getTime() + (60 * 60 * 1000)),
              httpOnly: true
          })
          .cookie("user", JSON.stringify(userClient), {
            sameSite: 'strict',
            expires: new Date(new Date().getTime() + (60 * 60 * 1000)),
            httpOnly: true
          })
          .send('User is registered')
        }
      })
    })
  })
}

exports.requiresLogin = expressJWT({ secret: process.env.JWT_SECRET, algorithms: ['HS256']})

exports.adminAuth = (req, res, next) => {
  const authUserId = req.user._id
  User.findOne({_id: authUserId}, (err, user) => {
      if(err || !user) return res.status(401).json('User not found')

      if(user.role !== 'admin') return res.status(401).json('Admin personnel only. Access denied')
      
      req.profile = user
      next()
  })
}

// FIXME: Removed Admin access code from login authentication
exports.adminLogin = (req, res) => {
  console.log(req.body)
  const {loginCred, password, code} = req.body
  User.findOne({$or: [{email: loginCred}, {username: loginCred}]}, (err, user) => {
    console.log(err)
      if(err || !user) return res.status(401).json('Username does not exist, please register first')
        if(user.role === 'admin'){
          console.log(user)
        user.comparePassword(password, (err, isMatch) => {
          console.log(err)
          if(isMatch){
            const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '60min', algorithm: 'HS256'})
            const {_id, username, email, role} = user
            const userClient = {_id, username, email, role}
            return res.status(202).cookie(
                "accessToken", token, {
                sameSite: 'strict',
                expires: new Date(new Date().getTime() + (60 * 60 * 1000)),
                httpOnly: true,
                secure: false,
                overwrite: true
            })
            .cookie("user", JSON.stringify(userClient), {
              sameSite: 'strict',
              expires: new Date(new Date().getTime() + (60 * 60 * 1000)),
              httpOnly: true,
              secure: false,
              overwrite: true
            })
            .send('User is logged in')
          }else{
            return res.status(401).json('Email and password do not match')
          }
        })
        }else{
          return res.status(401).json('Authorized personnel only')
        }
  })
}

exports.adminLogout = (req, res) => {
  res.clearCookie('user')
  res.clearCookie('accessToken')
  return res.json('Logged out');
}