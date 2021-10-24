const User = require('../models/auth')
const Student = require('../models/student-profile')
const Tags = require('../models/tags')
const jwt = require('jsonwebtoken')
const aws = require('aws-sdk')
const {resetPasswordEmail} = require('../templates/resetPassword')
const {changeEmailTemplate} = require('../templates/changeEmail')
const {studentChangePassword} = require('../templates/studentChangePassword')
const multer = require('multer')

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

let upload = multer({ storage: storage }).single('file')

const ses = new aws.SES({ apiVersion: '2010-12-01'})

exports.read = (req, res) => {
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

// STUDENT CRUD
exports.readStudent = (req, res) => {
  Student.findOne({_id: req.user._id}, (err, user) => {
    console.log(err)
    if(err) return res.status(401).json('Student not found')
    res.json('Logged in')
  })
}

exports.studentInfo = (req, res) => {
  Student.findById(req.body.user._id).populate('researchInterests').exec((err, user) => {
    if(err) return res.status(401).json('Student not found')
    return res.json(user)
  })
}

exports.studentChangePasswordEmail = (req, res) => {
  const token = jwt.sign({username: req.body.user.username, email: req.body.user.email, id: req.body.user._id}, process.env.JWT_RESET_PASSWORD, {expiresIn: '24hr'})
  
  const params = studentChangePassword(req.body.email, token)

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

exports.studentChangePassword = (req, res) => {
  jwt.verify(req.body.token, process.env.JWT_RESET_PASSWORD, (err, decoded) => {
  if(err) return res.status(400).json('This url has expired, please submit another request.')
    Student.findById(req.body.user.id, (err, user) => {
      console.log(err)
      if(err) return res.status(401).json('User does not exits, please register first')
      // if(isMatch){
        user.password = req.body.password
        user.save((err, updatedUser) => {
          if(err) return res.status(401).json('There was error updating your password, please try again later')
          res.clearCookie('student')
          res.clearCookie('studentAccessToken')
          return res.json(`Password has changed, please login with new password`)
        })
      // }
    })
  })
}

exports.studentUpdateProfile = async (req, res) => {
  upload(req, res, async function (err) {
    // console.log(req.file)
    // console.log(req.body)
    let photo = req.file ? req.file.filename : req.body.photo
    let tags = req.body.researchInterests.split(',')
    let tagsToRemove = req.body.tagsToRemove ? req.body.tagsToRemove.split(',') : null
    delete req.body.researchInterests
    
    if(req.file){
      return res.json('Profile image was updated')
    }

    if (err instanceof multer.MulterError) {
      console.log(err)
      return res.status(500).json('Error occurred uploading profile image')
    } else if (err) {
        return res.status(500).json('Error occurred uploading profile image')
    }
    
    let found = await Tags.find({tag: tags}, (err, item) => {}).exec()

    // TO CHECK IF TAGS EXISTS IN STUDENT PROFILE REFERENCE USE THESE STRINGS TO CHECK DATA
    let holdFound = [...found]
    holdFound = holdFound.map( (item) => {
      return item._id
    })

    if(found.length > 0){
      found.forEach( (item) => {
        tags = tags.filter( (i) => {return i !== item.tag})
      })
    }

    let json = tags.map( (i) => {
      return {"tag": i}
    })
    
    Tags.create(json, (err, item) => {
      console.log(err)
      if(err) {
        // if(err._message) return err._message == 'Tags validation failed' ? null : null
        if(!err._message) return res.status(400).json( err.code == 11000 ? 'Could not save duplicate tags' : 'There was an error saving a tag')
      }

      req.body.photo = photo
      
      Student.findByIdAndUpdate(req.body._id, req.body, (err, updatedStudent) => {
        console.log(err)
        // console.log(err)
        if(err) return res.status(400).json('Could not update student')

        Student.findById(req.body._id).populate('researchInterests').exec( (err, student) => {
          console.log(err)
          if(err) return res.status(401).json('Could not find student')
          
          if(item){
            // ADD TAGS THAT WERE JUST CREATED

            item.forEach( (i) => {
              student.researchInterests.push(i._id)
            })
          }else{
            // ADD TAGS THAT ARE NOT IN STUDENT PROFILE BUT EXIST IN TAG DATA MODEL
            
            let tagsInProfile = []
            if(student.researchInterests){
              tagsInProfile = student.researchInterests.map( (tag) => {
                return tag._id
              })
            }          
            
            holdFound.forEach( (item) => {
              let found
              if(tagsInProfile){
                found = tagsInProfile.find( value => value.toString() == item)
              }

              found ? null : (student.researchInterests.push(item))
            })
          }

          if(tagsToRemove){
            // REMOVE TAGS FROM STUDENT PROFILE
            let newArray = student.researchInterests.filter( (item) => {
              if(item.tag){
                if(tagsToRemove.indexOf(item.tag.toString()) == -1) return item
              }else{
                return item
              }
            })

            let ids = []
            if(newArray){
              ids = newArray.filter( (item) => item)
            }

            student.researchInterests = ids
          }

          student.save( (err, results) => {
            // console.log(err)
            if(err) return res.status(401).json('Could not save tags to student model')
            Student.findById(req.body._id).populate('researchInterests').exec(function(err, doc) {
              if(err) return res.status(401).json('Could not get students')
              res.json(doc)
            })
          })
        })
      })
    })
  })
}