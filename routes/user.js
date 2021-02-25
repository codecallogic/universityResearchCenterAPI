const express = require('express')
const router = express.Router()
const {read, createAnnouncement} = require('../controller/user')

// Middleware
const {requiresLogin, adminAuth} = require('../controller/auth')


router.get('/', requiresLogin, adminAuth, read)
router.post('/announcement/create', requiresLogin, adminAuth, createAnnouncement)

module.exports  = router