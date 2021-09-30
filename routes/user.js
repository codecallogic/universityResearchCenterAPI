const express = require('express')
const router = express.Router()
const {read, userInfo, updateUserInfo, userResetPasswordEmail} = require('../controller/user')

// Middleware
const {requiresLogin, adminAuth} = require('../controller/auth')

router.get('/admin', requiresLogin, adminAuth, read)
router.post('/user-info', userInfo)
router.post('/update-user-info', updateUserInfo)
router.post('/user-reset-password-email', userResetPasswordEmail)

module.exports  = router