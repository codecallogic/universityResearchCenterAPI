const User = require('../models/auth')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const shortId = require('shortid')
const expressJWT = require('express-jwt')
const nodemailer = require('nodemailer')
const mailgun = require('nodemailer-mailgun-transport')

// TODO: Admin login functionality

// FIXME: Apply reCAPTCHA if customer is interested
exports.register = async (req, res) => {
  const postExample = {
    "username": "gustavo",
    "email": "codecallogic@gmail.com",
    "password": "admingustavo1*",
    "firstName": "Gustavo",
    "lastName": "Borel",
    "role": "admin"
  }

  // Check if user is exists in database

  const {username, email, password, firstName, lastName, role} = req.body

  User.findOne({or: [{username, email}]}, (err, user) => {
    if(user) return res.status(400).json('Username or email already exists')

    // Generate token for new user
    
    const token = jwt.sign({username, email, password, firstName, lastName, role}, process.env.JWT_ACCOUNT_REGISTER, {expiresIn: '1hr'})

    // Send email with token url parameters for email confirmation and account activation

    const auth = {
      auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: 'www.fabricioguardia.com'
      }
    }

    const transporter = nodemailer.createTransport(mailgun(auth))

    const mailOptions = {
      from: 'contact@fabricioguardia.com',
      to: email,
      subject: firstName + ' please verify your email',
      template: 'university',
      'v:firstname': firstName,
      'v:clientURL': process.env.CLIENT_URL,
      'v:token': token,
      'v:email': email
    }

    transporter.sendMail(mailOptions, (err, data) => {
      if(err) return res.status(400).json(err)
      res.json(data)
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
  console.log(req.user)
  const authUserId = req.user._id
  User.findOne({_id: authUserId}, (err, user) => {
      if(err || !user) return res.status(401).json('User not found')

      if(user.role !== 'admin') return res.status(401).json('Admin personnel only. Access denied')
      
      req.profile = user
      next()
  })
}

exports.adminLogin = (req, res) => {
  const {loginCred, password, code} = req.body

  User.findOne({$or: [{email: loginCred}, {username: loginCred}]}, (err, user) => {
      if(err || !user) return res.status(401).json('Username does not exist, please register first')
        if(code === process.env.ADMIN_LOGIN_REGISTRATION_CODE){
          if(user.role === 'admin'){
          user.comparePassword(password, (err, isMatch) => {
            if(isMatch){
              const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '60min', algorithm: 'HS256'})
              const {_id, username, email, role} = user
              const userClient = {_id, username, email, role}
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
              .send('User is logged in')
            }else{
              return res.status(401).json('Email and password do not match')
            }
          })
          }else{
            return res.status(401).json('Authorized personnel only')
          }
        }else{
          return res.status(401).json('Admin code does not match')
        }
  })
}

exports.adminLogout = (req, res) => {
  res.clearCookie('user')
  res.clearCookie('accessToken')
  return res.json('Logged out');
}