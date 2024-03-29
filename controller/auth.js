const User = require('../models/auth')
const Student = require('../models/student-profile')
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
  // Check if user is exists in database
  User.findOne({or: [{username: req.body.username, email: req.body.email}]}, (err, user) => {
    // console.log(user)
    if(user) return res.status(400).json('Username or email already exists')

    // Generate token for new user
    
    const token = jwt.sign({username: req.body.username, email: req.body.email, firstName: req.body.firstName, password: req.body.tempPassword,lastName: req.body.lastName, role: req.body.role}, process.env.JWT_ACCOUNT_REGISTER, {expiresIn: '24hr'})

    // Send email with token url parameters for email confirmation and account activation

    const params = inviteAdministratorEmail(req.body.email, token, req.body.firstName, req.body.username, req.body.tempPassword)

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
  const user = jwt.decode(req.body.token)
  
  jwt.verify(req.body.token, process.env.JWT_ACCOUNT_REGISTER, (err, decoded) => {
    if(err){
      return res.status(400).json('This url has expired, please submit another invite request.')
    }

    const urlId = shortId.generate()
    
    User.findOne({$or: [{email: user.email}, {username: user.username}]}, (err, found) => {
      if(found){
        console.log(err)
        return res.status(401).json('Email or username already exists')
      }

      user.urlId = urlId

      const newUser = new User(user)
      newUser.save((err, result) => {
        if(err){
          console.log(err)
          return res.status(401).json('Could not register user, please try again later')
        }

        if(result){
          const token = jwt.sign({_id: result._id}, process.env.JWT_SECRET, {expiresIn: '3hr', algorithm: 'HS256'})
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
          .send('Admin is registered')
        }
      })
    })
  })
}

exports.requiresLogin = expressJWT({ secret: process.env.JWT_SECRET, algorithms: ['HS256']})

exports.adminAuth = (req, res, next) => {
  const authUserId = req.user._id
  User.findOne({_id: authUserId}, (err, user) => {
    console.log(err)
    if(err || !user) return res.status(401).json('User not found')
    // console.log(user)
    if(user.role == 'admin' || user.role == 'admin_restricted'){
      req.profile = user
      next()
    }else{
      return res.status(401).json('Admin personnel only. Access denied')
    }
  })
}

// FIXME: Removed Admin access code from login authentication
exports.adminLogin = (req, res) => {
  // console.log(req.body)
  const {loginCred, password, code} = req.body
  User.findOne({$or: [{email: loginCred}, {username: loginCred}]}, (err, user) => {
    console.log(err)
    if(err || !user) return res.status(401).json('Username does not exist, please register first')
      if(user.role === 'admin' || user.role === 'admin_restricted'){
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
        return res.status(401).json('Authorized personnel only, access denied')
      }
  })
}

exports.adminLogout = (req, res) => {
  res.clearCookie('user')
  res.clearCookie('accessToken')
  return res.json('Logged out');
}

exports.getUsers = (req, res) => {
  if(req.profile.role == 'admin'){
    User.find({}, (err, users) => {
      if(err) return res.status(401).json('There was error loading admin users')
      return res.json(users)
    })
  }
  if(req.profile.role == 'admin_restricted'){
    User.find({role: 'admin_restricted'}, (err, users) => {
      if(err) return res.status(401).json('There was error loading admin users')
      return res.json(users)
    })
  }
}

exports.adminDelete = (req, res) => {
  User.findByIdAndDelete(req.body[0], (err, response) => {
    if(err) res.status(400).json('Error deleting the administrator')
    User.find({}, (err, results) => {
      if(err) return res.status(401).json('Could not get admin users')
      res.json(results)
    })
  })
}

exports.activateStudent = (req, res) => {
  const user = jwt.decode(req.body.token)
  // console.log(user)
  jwt.verify(req.body.token, process.env.JWT_ACCOUNT_REGISTER, (err, decoded) => {
    if(err){
      console.log(err)
      return res.status(400).json('This url has expired, please submit another invite request.')
    }

    const urlId = shortId.generate()
    
    Student.findOne({$or: [{email: user.email}, {username: user.username}]}, (err, found) => {
      if(err){
        console.log(err)
        return res.status(401).json('Error occurred account was not registered by an admin.')
      }

      found.urlId = urlId
      found.activate = true

      Student.findByIdAndUpdate(found._id, found, {new: true}, (err, updatedStudent) => {
        if(err) return res.status(401).json('Error occurred activating you account, please contact our support team')
          const token = jwt.sign({_id: updatedStudent._id}, process.env.JWT_SECRET, {expiresIn: '3hr', algorithm: 'HS256'})
          const {_id, username, firstName, email} = updatedStudent
          const studentClient = {_id, username, firstName, email}
          return res.status(202).cookie(
              "studentAccessToken", token, {
              sameSite: 'strict',
              expires: new Date(new Date().getTime() + (60 * 60 * 1000)),
              httpOnly: true
          })
          .cookie("student", JSON.stringify(studentClient), {
            sameSite: 'strict',
            expires: new Date(new Date().getTime() + (60 * 60 * 1000)),
            httpOnly: true
          })
          .send('Student is activated')
      })
    })
  })
}

// STUDENT CRUD
exports.studentLogin = (req, res) => {
  Student.findOne({$or: [{username: req.body.username}, {email: req.body.username}]}, (err, student) => {
    console.log(err)
    if(err || !student) return res.status(401).json('Username does not exist, please register first')
      if(student.activate){
      student.comparePassword(req.body.password, (errPass, isMatch) => {
        console.log(errPass)
        console.log(isMatch)
        // lA7,t=2I<9Ej{2Yp
        if(isMatch){
          const token = jwt.sign({_id: student._id}, process.env.JWT_SECRET, {expiresIn: '60min', algorithm: 'HS256'})
          const {_id, username, email} = student
          const studentClient = {_id, username, email}
          return res.status(202).cookie(
              "studentAccessToken", token, {
              sameSite: 'strict',
              expires: new Date(new Date().getTime() + (60 * 60 * 1000)),
              httpOnly: true,
              secure: false,
              overwrite: true
          })
          .cookie("student", JSON.stringify(studentClient), {
            sameSite: 'strict',
            expires: new Date(new Date().getTime() + (60 * 60 * 1000)),
            httpOnly: true,
            secure: false,
            overwrite: true
          })
          .send('Student is logged in')
        }else{
          return res.status(401).json('Email and password do not match')
        }
      })
      }else{
        return res.status(401).json('Student account is not activated, please activate from link email received.')
      }
  })
}

exports.requiresStudentLogin = expressJWT({ secret: process.env.JWT_SECRET, algorithms: ['HS256']})

exports.studentAuth = (req, res, next) => {
  const authUserId = req.user._id
  Student.findOne({_id: authUserId}, (err, user) => {
    console.log(err)
    if(err || !user) return res.status(401).json('Student not found')
    // console.log(user)
    if(user.activate){
      req.profile = user
      next()
    }else{
      return res.status(401).json('Student account is not activate.')
    }
  })
}

exports.studentLogout = (rew, res) => {
  res.clearCookie('student')
  res.clearCookie('studentAccessToken')
  res.json('Student logged out')
}