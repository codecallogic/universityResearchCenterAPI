const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Header = new Schema(
{
  headline: {
    type: String,
    required: true,
  },
  subheading: {
    type: String,
    required: true,
  },
  button: {
    type: String,
    required: true,
  },
  imageLeftColumn: {
    type: String,
    required: true,
  },
  imageRightColumn: {
    type: String,
    required: true,
  },
  captionOne: {
    type: String,
    required: true,
  },
  captionTwo: {
    type: String,
  },
  enabled: {
    type: Boolean,
    default: true,
  }
},
{
    timestamps: true
})

module.exports = mongoose.model('Header-Component', Header)