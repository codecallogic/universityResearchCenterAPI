const mongoose = require('mongoose')
const Schema = mongoose.Schema

const opportunitySchema = new Schema(
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
  expiration: {
    type: Date,
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

module.exports = mongoose.model('Opportunities-Students', opportunitySchema)