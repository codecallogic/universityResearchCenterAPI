const express = require('express')
const router = express.Router()
const {createAnnouncement, listAnnouncements, updateAnnouncement, deleteAnnouncement, listAnnouncementsPublic} = require('../controller/crud')

// Middleware
const {requiresLogin, adminAuth} = require('../controller/auth')

// CRUD for announcements
router.post('/announcement/create', requiresLogin, adminAuth, createAnnouncement)
router.get('/announcement/list', requiresLogin, adminAuth, listAnnouncements)
router.post('/announcement/update', requiresLogin, adminAuth, updateAnnouncement)
router.post('/announcement/delete', requiresLogin, adminAuth, deleteAnnouncement)
router.get('/announcement/public/list', listAnnouncementsPublic)

module.exports  = router