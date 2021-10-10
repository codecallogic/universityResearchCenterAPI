const express = require('express')
const router = express.Router()
const {createNavItem, getNavItems, updateNavItem, deleteNavItem, createNavMenu, getNavMenus, updateNavMenu} = require('../controller/menu')

router.post('/create-nav-item', createNavItem)
router.get('/get-nav-items', getNavItems)
router.post('/update-nav-item', updateNavItem)
router.post('/delete-nav-item', deleteNavItem)
router.post('/create-nav-menu', createNavMenu)
router.get('/get-nav-menus', getNavMenus)
router.post('/update-nav-menu', updateNavMenu)

module.exports  = router