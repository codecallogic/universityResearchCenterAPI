const e = require('express')
const Announcement = require('../models/announcement')

exports.createAnnouncement = (req, res) => {
  const {title, subtitle, imageURL, imageDescr, primary, message} = req.body.announcement

  if(primary === true){
    Announcement.find({primary: true}, (err, pri) => {
    const allPrimary = pri.map( (data) => {
      return data._id
    })

    Announcement.updateMany(
      {_id: { $in: allPrimary }}, 
      {$set: {'primary': false}}, 
      {multi: true},
      (err, results) => {
        if(err) return res.status(400).json('Could not update announcement')
      })
    })
  }
  
  Announcement.findOne({$or: [{title: title}, {subtitle: subtitle}]}, (err, announcement) => {
    if(err) return res.status(401).json('You cannot have duplicate announcements with same title or subtitle')

    const newAnnouncement = new Announcement({title, subtitle, imageURL, imageDescr, primary, message})

    newAnnouncement.save( (err, results) => {
      if(err) return res.status(401).json(`Sorry we're having trouble posting the announcement`)
      res.json('Announcement has been posted')
    })
  })
}

exports.listAnnouncements = (req, res) => {
  Announcement.find({}, (err, results) => {
    if(err) return res.status(401).json('Could not get announcements')
    res.json(results)
  })
}

exports.updateAnnouncement = (req, res) => {
  const {id, title, subtitle, imageURL, imageDescr, primary, enabled, message} = req.body

  if(primary === true){
    Announcement.find({primary: true}, (err, pri) => {
    const allPrimary = pri.map( (data) => {
      return data._id
    })

    Announcement.updateMany(
      {_id: { $in: allPrimary }}, 
      {$set: {'primary': false}}, 
      {multi: true},
      (err, results) => {
        if(err) return res.status(400).json('Could not update announcement')
      })
    })
  }
  
  Announcement.findByIdAndUpdate(id, {$set: {
    'title': title,
    'subtitle': subtitle,
    'imageURL': imageURL,
    'imageDescr': imageDescr,
    'primary': primary,
    'enabled': enabled,
    'message': message
  }}, (err, results) => {
    if(err) return res.status(400).json('Could not update category')
    Announcement.find({}, (err, results) => {
      if(err) return res.status(401).json('Could not get announcements')
      res.json(results)
    })
  })
}

exports.deleteAnnouncement = (req, res) => {
  Announcement.findByIdAndDelete(req.body[0], (err, response) => {
    if(err) res.status(400).json('Error deleting the announcement')
    console.log(response)
    Announcement.find({}, (err, results) => {
      if(err) return res.status(401).json('Could not get announcements')
      console.log(results)
      res.json(results)
    })
  })
}

exports.listAnnouncementsPublic = (req, res) => {
  Announcement.find({}, (err, results) => {
    if(err) return res.status(401).json('Could not get announcements')
    res.json(results)
  })
}