const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Tags = new Schema(
{
  tag: {
    type: String,
    unique: true,
  }
},
{
    timestamps: true
})


module.exports = mongoose.model('Tags', Tags)