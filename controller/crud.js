const Announcement = require('../models/announcement')
const Meeting = require('../models/meetings')

// ANNOUNCEMENTS
exports.createAnnouncement = (req, res) => {
  const {title, subtitle, imageURL, imageDescr, primary, message} = req.body.content

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
    if(announcement) return res.status(401).json('You cannot have duplicate announcements with same title or subtitle')

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

// MEETINGS
exports.createMeeting = (req, res) => {
  const {title, subtitle, expiration, source, message} = req.body.content
  
  Meeting.findOne({$or: [{title: title}, {subtitle: subtitle}]}, (err, meeting) => {
    if(meeting) return res.status(401).json('You cannot have duplicate meetings with same title or subtitle')

    const newMeeting = new Meeting({title, subtitle, source, expiration, message})

    newMeeting.save( (err, results) => {
      if(err) return res.status(401).json(`Sorry we're having trouble posting the meeting`)
      res.json('Meeting or activity has been posted')
    })
  })
}

exports.listMeetings = (req, res) => {
  Meeting.find({}, (err, results) => {
    if(err) return res.status(401).json('Could not get meetings and activities')
    res.json(results)
  })
}

exports.updateMeeting = (req, res) => {
  const {id, title, subtitle, source, expiration, enabled, message} = req.body
  
  Meeting.findByIdAndUpdate(id, {$set: {
    'title': title,
    'subtitle': subtitle,
    'source': source,
    'expiration': expiration,
    'enabled': enabled,
    'message': message
  }}, (err, results) => {
    if(err) return res.status(400).json('Could not update meeting')
    Meeting.find({}, (err, results) => {
      if(err) return res.status(401).json('Could not get meetings and activities')

      let newResultsExpirationDates = results.map( item => {
        item.expiration.toISOString().slice(0,10)
        console.log(item)
        return item
      })

      res.json(results)
    })
  })
}
