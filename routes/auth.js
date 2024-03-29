const express = require('express')
const router = express.Router()
const {register, activate, adminLogin, adminLogout, requiresLogin, adminAuth, getUsers, adminDelete, activateStudent, studentLogin, studentLogout} = require('../controller/auth')
const {registerUserValidator, adminLoginValidator} = require('../validators/auth')
const {runValidation} = require('../validators')
// requiresLogin, adminAuth,
router.post('/register', requiresLogin, adminAuth, register)
router.post('/register/activate', activate)
router.post('/admin/login', adminLoginValidator, runValidation, adminLogin)
router.post('/admin/logout', adminLogout)
router.get('/admin/list', requiresLogin, adminAuth, getUsers)
router.post('/admin/delete', requiresLogin, adminAuth, adminDelete)
router.post('/register/student/activate', activateStudent)

// STUDENT AUTH
router.post('/student/login', adminLoginValidator, runValidation, studentLogin)
router.post('/student/logout', studentLogout)

module.exports  = router