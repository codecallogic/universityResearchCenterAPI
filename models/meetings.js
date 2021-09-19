const mongoose = require('mongoose')
const Schema = mongoose.Schema

const meetingSchema = new Schema(
{
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  source: {
    type: String,
    required: true
  },
  postDate: {
    type: String,
    default: ''
  },
  expiration: {
    type: String,
    default: ''
  },
  enabled: {
    type: Boolean,
    default: true,
    required: true
  },
  message: {
    type: String,
    required: true
  }
},
{
    timestamps: true
})

module.exports = mongoose.model('Meetings', meetingSchema)