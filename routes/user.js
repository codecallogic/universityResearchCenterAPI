const express = require('express')
const router = express.Router()
const {read, userInfo, updateUserInfo, userResetPasswordEmail, userChangePassword, userChangeEmail, updateEmail} = require('../controller/user')
const {passwordValidator} = require('../validators/auth')
const {runValidation} = require('../validators')

// Middleware
const {requiresLogin, adminAuth} = require('../controller/auth')
// passwordValidator, runValidation,
router.get('/admin', requiresLogin, adminAuth, read)
router.post('/user-info', userInfo)
router.post('/update-user-info', updateUserInfo)
router.post('/user-reset-password-email', userResetPasswordEmail)
router.post('/user-change-password', passwordValidator, runValidation, userChangePassword)
router.post('/user-change-email', userChangeEmail)
router.post('/user-update-email', updateEmail)

module.exports  = router