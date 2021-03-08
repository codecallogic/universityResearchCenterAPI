const express = require('express')
const router = express.Router()
const {createAnnouncement, listAnnouncements, updateAnnouncement, deleteAnnouncement, listAnnouncementsPublic, createMeeting, listMeetings, updateMeeting, deleteMeeting, listMeetingsPublic} = require('../controller/crud')

// Middleware
const {requiresLogin, adminAuth} = require('../controller/auth')

// CRUD for announcements
router.post('/announcement/create', requiresLogin, adminAuth, createAnnouncement)
router.get('/announcement/list', requiresLogin, adminAuth, listAnnouncements)
router.post('/announcement/update', requiresLogin, adminAuth, updateAnnouncement)
router.post('/announcement/delete', requiresLogin, adminAuth, deleteAnnouncement)
router.get('/announcement/public/list', listAnnouncementsPublic)
router.post('/meeting/create', requiresLogin, adminAuth, createMeeting)
router.get('/meetings/list', requiresLogin, adminAuth, listMeetings)
router.post('/meeting/update', requiresLogin, adminAuth, updateMeeting)
router.post('/meeting/delete', requiresLogin, adminAuth, deleteMeeting)
router.get('/meetings/public/list', listMeetingsPublic)

module.exports  = router