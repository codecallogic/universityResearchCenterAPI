const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentProfileSchema = new Schema(
{
  photo: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  linkedIn: {
    type: String,
    required: true
  },
  researchInterests: {
    type: Array,
    required: true
  },
  institution: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  areaOfStudy: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  activity: {
    type: String,
    required: true
  },
  biography: {
    type: String,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  research: {
    type: String,
    required: true
  },
  publication: {
    type: String,
    required: true
  },
  enabled: {
    type: Boolean,
    required: true,
    default: true
  }
},
{
    timestamps: true
})

module.exports = mongoose.model('Student-Profile', studentProfileSchema)