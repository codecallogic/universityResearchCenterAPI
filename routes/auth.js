const express = require('express')
const router = express.Router()
const {register, activate, adminLogin, adminLogout, requiresLogin, adminAuth} = require('../controller/auth')
const {registerUserValidator, adminLoginValidator} = require('../validators/auth')
const {runValidation} = require('../validators')
// registerUserValidator, runValidation,
router.post('/register', requiresLogin, adminAuth, register)
router.post('/register/activate', activate)
router.post('/admin/login', adminLoginValidator, runValidation, adminLogin)
router.post('/admin/logout', adminLogout)

module.exports  = router