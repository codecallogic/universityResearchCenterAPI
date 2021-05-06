const express = require('express')
const router = express.Router()
const {read} = require('../controller/user')

// Middleware
const {requiresLogin, adminAuth, upload} = require('../controller/auth')

router.get('/admin', requiresLogin, adminAuth, read)

module.exports  = router