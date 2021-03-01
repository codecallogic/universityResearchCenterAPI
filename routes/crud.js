const express = require('express')
const router = express.Router()
const {createAnnouncement, list, updateAnnouncement} = require('../controller/crud')

// Middleware
const {requiresLogin, adminAuth} = require('../controller/auth')

// CRUD for announcements
router.post('/announcement/create', requiresLogin, adminAuth, createAnnouncement)
router.get('/announcement/list', requiresLogin, adminAuth, list)
router.post('/announcement/update', requiresLogin, adminAuth, updateAnnouncement)

module.exports  = router