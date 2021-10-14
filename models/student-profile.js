const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 6

const studentProfileSchema = new Schema(
{
  photo: {
    type: String,
    required: true
  },
  nanoid: {
    type: String,
    required: true
  },
  username: {
    type: String,
  },
  password: {
    type: String,
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
  researchInterests: [{
    type: Schema.Types.ObjectId, ref: 'Tags'
  }],
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
  },
  urlId: {
    type: String,
  },
  activate: {
    type: Boolean,
    default: false
  }
},
{
    timestamps: true
})

studentProfileSchema.pre('save', function(next){
  const user = this;
  if(!user.isModified('password')) return next()
  bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash){
      if(err) return next(err)
      user.password = hash
      next()
  })
})

studentProfileSchema.methods.comparePassword = function(tryPassword, cb){
  bcrypt.compare(tryPassword, this.password, cb)
}


module.exports = mongoose.model('Student-Profile', studentProfileSchema)