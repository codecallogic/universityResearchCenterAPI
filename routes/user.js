const express = require('express')
const router = express.Router()
const {read, userInfo, updateUserInfo, userResetPasswordEmail, userChangePassword, userChangeEmail, updateEmail, readStudent, studentInfo, studentChangePasswordEmail, studentChangePassword, studentUpdateProfile} = require('../controller/user')
const {passwordValidator} = require('../validators/auth')
const {runValidation} = require('../validators')

// Middleware
const {requiresLogin, adminAuth, requiresStudentLogin, studentAuth} = require('../controller/auth')
// passwordValidator, runValidation,
router.get('/admin', requiresLogin, adminAuth, read)
router.post('/user-info', userInfo)
router.post('/update-user-info', updateUserInfo)
router.post('/user-reset-password-email', userResetPasswordEmail)
router.post('/user-change-password', passwordValidator, runValidation, userChangePassword)
router.post('/user-change-email', userChangeEmail)
router.post('/user-update-email', updateEmail)

// requiresStudentLogin, studentAuth, 
// STUDENT ROUTES
router.get('/student', requiresStudentLogin, studentAuth, readStudent)
router.post('/student-user-info', studentInfo)
router.post('/student-change-password-email', studentChangePasswordEmail)
router.post('/student-change-password', studentChangePassword)
router.post('/student-update-profile', studentUpdateProfile)

module.exports  = router