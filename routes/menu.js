const express = require('express')
const router = express.Router()
const {createNavItem, getNavItems, updateNavItem, deleteNavItem} = require('../controller/menu')

router.post('/create-nav-item', createNavItem)
router.get('/get-nav-items', getNavItems)
router.post('/update-nav-item', updateNavItem)
router.post('/delete-nav-item', deleteNavItem)

module.exports  = router