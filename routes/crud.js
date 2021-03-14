const express = require('express')
const router = express.Router()
const {createAnnouncement, listAnnouncements, updateAnnouncement, deleteAnnouncement, listAnnouncementsPublic, createMeeting, listMeetings, updateMeeting, deleteMeeting, listMeetingsPublic, createFacultyOpportunity, listFacultyOpportunities, updateFacultyOpportunity, deleteFacultyOpportunity, listFacultyOpportunitiesPublic, createStudentOpportunity, listStudentOpportunities, updateStudentOpportunity, deleteStudentOpportunity} = require('../controller/crud')

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
router.post('/opportunity-faculty/create', requiresLogin, adminAuth, createFacultyOpportunity)
router.get('/opportunities-faculty/list', requiresLogin, adminAuth, listFacultyOpportunities)
router.post('/opportunity-faculty/update', requiresLogin, adminAuth, updateFacultyOpportunity)
router.post('/opportunity-faculty/delete', requiresLogin, adminAuth, deleteFacultyOpportunity)
router.get('/opportunities-faculty/public/list', listFacultyOpportunitiesPublic)
router.post('/opportunity-students/create', requiresLogin, adminAuth, createStudentOpportunity)
router.get('/opportunities-students/list', requiresLogin, adminAuth, listStudentOpportunities)
router.post('/opportunity-students/update', requiresLogin, adminAuth, updateStudentOpportunity)
router.post('/opportunity-students/delete', requiresLogin, adminAuth, deleteStudentOpportunity)

module.exports  = router