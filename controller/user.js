const User = require('../models/auth')

exports.read = (req, res) => {
  User.findOne({_id: req.user._id}, (err, user) => {
    if(err) return res.status(400).json('User not found')
    res.json('Logged in')
  })  
}