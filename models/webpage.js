const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Webpage = new Schema(
{
  heading: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  }
},
{
    timestamps: true
})

module.exports = mongoose.model('Webpage', Webpage)