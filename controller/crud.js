const Announcement = require('../models/announcement')

exports.createAnnouncement = (req, res) => {
  const {title, subtitle, imageURL, imageDescr, message} = req.body.announcement
  
  Announcement.findOne({$or: [{title: title}, {subtitle: subtitle}]}, (err, announcement) => {
    if(err) return res.status(401).json('You cannot have duplicate announcements with same title or subtitle')

    const newAnnouncement = new Announcement({title, subtitle, imageURL, imageDescr, message})

    newAnnouncement.save( (err, results) => {
      if(err) return res.status(401).json(`Sorry we're having trouble posting the announcement`)
      res.json('Announcement has been posted')
    })
  })
}

exports.list = (req, res) => {
  Announcement.find({}, (err, all) => {
    if(err) return res.status(401).json('Could not get announcements')
    res.json(all)
  })
}