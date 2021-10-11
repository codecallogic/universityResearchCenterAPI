const NavItem = require('../models/nav-item')
const NavMenu = require('../models/nav-menu')

exports.createNavItem = (req, res) => {
  NavItem.findOne({name: {$regex: req.body.name, $options: 'i'}}, (err, navItem) => {
    if(navItem) return res.status(401).json('Could not have items with same name')

    const newItem = new NavItem(req.body)

    newItem.save((err, newNavItem) => {
      if(err) return res.status(401).json('Error saving item')
      NavItem.find({}, (err, items) => {
        return res.json(items)
      })
    })
  })
}

exports.getNavItems = (req, res) => {
  NavItem.find({}, (err, items) => {
    if(err) return res.status(401).json('Could not get nav items list')
    return res.json(items)
  })
}

exports.updateNavItem = (req, res) => {
  NavItem.findByIdAndUpdate(req.body._id, req.body, (err, updatedNavItem) => {
    if(err) return res.statsu(401).json('Error ocurred updating the nav item')
    NavItem.find({}, (err, items) => {
      if(err) return res.status(401).json('Error ocurred returning items')
      return res.json(items)
    })
  })
}

exports.deleteNavItem = (req, res) => {
  // console.log(req.body)
  NavItem.findByIdAndDelete(req.body[0], (err, response) => {
    if(err) return res.status(401).json('Error ocurred deleting nav item')
    console.log(response)

    NavMenu.updateMany({ "item" : { $in : [req.body[0]] }}, { $pullAll : {"item" : [req.body[0]] }} , (err, response) => {

      console.log(err)
      if(err) res.status(401).json('Error ocurred removing nav item from parents menus')

      NavItem.find({}, (err, items) => {
        if(err) return res.status(401).json('Error ocurred returning items')
        return res.json(items)
      })
    })
  })
}

exports.createNavMenu = (req, res) => {
  NavMenu.findOne({name: {$regex: req.body.name, $options: 'i'}}, (err, navMenu) => {
    console.log(err)
    if(navMenu) return res.status(401).json('Could not have a nav menu with same name')

    const newNavMenu = new NavMenu(req.body)

    newNavMenu.save((err, menu) => {
      console.log(err)
      if(err) return res.status(401).json('Error occured saving the nave menu')
      return res.json(`Create nav menu ${menu.name}`)
    })
  })
}

exports.getNavMenus = (req, res) => {
  NavMenu.find({}).populate('item').exec((err, menus) => {
    if(err) return res.status(401).json('Error occurred could not get nav menus')
    return res.json(menus)
  })
}

exports.updateNavMenu = (req, res) => {
  let updatedItems = []
  req.body.item.filter((item) => {
    updatedItems.push(item._id)
  })
  
  req.body.item = updatedItems
  
  NavMenu.findByIdAndUpdate(req.body._id, req.body, (err, updatedMenu) => {
    if(err) return res.statsu(401).json('Error ocurred updating the nav menu')
    NavMenu.find({}).populate('item').exec((err, items) => {
      if(err) return res.status(401).json('Error ocurred returning items')
      return res.json(items)
    })
  })
}