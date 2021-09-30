const express = require('express')
const router = express.Router()
const {register, activate, adminLogin, adminLogout, requiresLogin, adminAuth, getUsers, adminDelete} = require('../controller/auth')
const {registerUserValidator, adminLoginValidator} = require('../validators/auth')
const {runValidation} = require('../validators')
// requiresLogin, adminAuth,
router.post('/register', requiresLogin, adminAuth, register)
router.post('/register/activate', activate)
router.post('/admin/login', adminLoginValidator, runValidation, adminLogin)
router.post('/admin/logout', adminLogout)
router.get('/admin/list', requiresLogin, adminAuth, getUsers)
router.post('/admin/delete', requiresLogin, adminAuth, adminDelete)

module.exports  = router