const express = require('express')
const router = express.Router()
const {register, activate, adminLogin} = require('../controller/auth')
const {registerUserValidator, adminLoginValidator} = require('../validators/auth')
const {runValidation} = require('../validators')

router.post('/register', registerUserValidator, runValidation,register)
router.post('/register/activate', activate)
router.post('/admin/login', adminLoginValidator, runValidation, adminLogin)

module.exports  = router