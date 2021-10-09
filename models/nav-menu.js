const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NavMenu = new Schema(
{
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
  item: [{
    type: Schema.Types.ObjectId, ref: 'NavItem'
  }]
},
{
    timestamps: true
})

module.exports = mongoose.model('NavMenu', NavMenu)