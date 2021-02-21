const express = require('express')
const router = express.Router()
const {register, activate} = require('../controller/auth')
const {registerUserValidator} = require('../validators/auth')
const {runValidation} = require('../validators')

router.post('/register', registerUserValidator, runValidation,register)
router.post('/register/activate', activate)

module.exports  = router