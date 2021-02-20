const express = require('express')
const router = express.Router()
const {register, activate} = require('../controller/auth')


router.post('/register', register)
router.post('/register/activate', activate)

module.exports  = router