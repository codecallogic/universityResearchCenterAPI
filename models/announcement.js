const mongoose = require('mongoose')
const Schema = mongoose.Schema

const announcementSchema = new Schema(
{
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  imageURL: {
    type: String,
    required: true,
  },
  imageDescr: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  }
},
{
    timestamps: true
})

module.exports = mongoose.model('Announcement', announcementSchema)