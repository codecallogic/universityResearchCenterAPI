const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NavItem = new Schema(
{
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true
  }
},
{
    timestamps: true
})

module.exports = mongoose.model('NavItem', NavItem)