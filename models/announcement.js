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
  },
  enabled: {
    type: Boolean,
    default: true,
    required: true
  },
  nanoid: {
    type: String,
    required: true
  },
  primary: {
    type: Boolean,
  }
},
{
    timestamps: true
})

announcementSchema.index({primary: 1}, {unique: true, partialFilterExpression: {primary: true}})

module.exports = mongoose.model('Announcement', announcementSchema)