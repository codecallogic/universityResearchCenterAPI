const NavItem = require('../models/nav-item')

exports.createNavItem = (req, res) => {
  NavItem.findOne({name: req.body.name}, (err, navItem) => {
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
  console.log(req.body)
  NavItem.findByIdAndDelete(req.body[0], (err, response) => {
    if(err) return res.status(401).json('Error ocurred deleting nav item')
    NavItem.find({}, (err, items) => {
      if(err) return res.status(401).json('Error ocurred returning items')
      return res.json(items)
    })
  })
}