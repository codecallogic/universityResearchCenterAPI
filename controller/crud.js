const Announcement = require('../models/announcement')
const Meeting = require('../models/meetings')
const OpportunityForFaculty = require('../models/opportunities-faculty')
const OpportunityForStudents = require('../models/opportunities-students')

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
    Announcement.find({}, (err, results) => {
      if(err) return res.status(401).json('Could not get announcements')
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

  console.log({'Hello': expiration})

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
      res.json(results)
    })
  })
}

exports.deleteMeeting = (req, res) => {
  Meeting.findByIdAndDelete(req.body[0], (err, response) => {
    if(err) res.status(400).json('Error deleting the meeting')
    Meeting.find({}, (err, results) => {
      if(err) return res.status(401).json('Could not get meetings and activities')
      res.json(results)
    })
  })
}

exports.listMeetingsPublic = (req, res) => {
  Meeting.find({}, (err, results) => {
    if(err) return res.status(401).json('Could not get meetings and activities')
    res.json(results)
  })
}

// OPPORTUNITIES FOR FACULTY
exports.createFacultyOpportunity = (req, res) => {
  const {title, subtitle, expiration, source, message} = req.body.content

  OpportunityForFaculty.findOne({$or: [{title: title}, {subtitle: subtitle}]}, (err, meeting) => {
    if(meeting) return res.status(401).json('You cannot have duplicate opportunities with same title or subtitle')

    const newOpportunityForFaculty = new OpportunityForFaculty({title, subtitle, source, expiration, message})

    newOpportunityForFaculty.save( (err, results) => {
      if(err) return res.status(401).json(`Sorry we're having trouble posting the opportunity`)
      res.json('Opportunity has been posted')
    })
  })
}

exports.listFacultyOpportunities = (req, res) => {
  OpportunityForFaculty.find({}, (err, results) => {
    console.log(err)
    if(err) return res.status(401).json('Could not get opportunities for faculty')
    console.log(results)
    res.json(results)
  })
}

exports.updateFacultyOpportunity = (req, res) => {
  const {id, title, subtitle, source, expiration, enabled, message} = req.body
  
  OpportunityForFaculty.findByIdAndUpdate(id, {$set: {
    'title': title,
    'subtitle': subtitle,
    'source': source,
    'expiration': expiration,
    'enabled': enabled,
    'message': message
  }}, (err, results) => {
    if(err) return res.status(400).json('Could not update opportunity')
    OpportunityForFaculty.find({}, (err, results) => {
      if(err) return res.status(401).json('Could not get opportunities for faculty')
      res.json(results)
    })
  })
}

exports.deleteFacultyOpportunity = (req, res) => {
  OpportunityForFaculty.findByIdAndDelete(req.body[0], (err, response) => {
    if(err) res.status(400).json('Error deleting the meeting')
    Opportunity.find({}, (err, results) => {
      if(err) return res.status(401).json('Could not get opportunities for faculty')
      res.json(results)
    })
  })
}

exports.listFacultyOpportunitiesPublic = (req, res) => {
  OpportunityForFaculty.find({}, (err, results) => {
    if(err) return res.status(401).json('Could not get opportunities for faculty')
    res.json(results)
  })
}

// OPPORTUNITIES FOR STUDENTS
exports.createStudentOpportunity = (req, res) => {
  const {title, subtitle, expiration, source, message} = req.body.content

  OpportunityForStudents.findOne({$or: [{title: title}, {subtitle: subtitle}]}, (err, meeting) => {
    if(meeting) return res.status(401).json('You cannot have duplicate opportunities with same title or subtitle')

    const newStudentOpportunity = new OpportunityForStudents({title, subtitle, source, expiration, message})

    newStudentOpportunity.save( (err, results) => {
      if(err) return res.status(401).json(`Sorry we're having trouble posting the opportunity`)
      res.json('Opportunity has been posted')
    })
  })
}

exports.listStudentOpportunities = (req, res) => {
  OpportunityForStudents.find({}, (err, results) => {
    if(err) return res.status(401).json('Could not get opportunities for students')
    res.json(results)
  })
}

exports.updateStudentOpportunity = (req, res) => {
  const {id, title, subtitle, source, expiration, enabled, message} = req.body
  
  OpportunityForStudents.findByIdAndUpdate(id, {$set: {
    'title': title,
    'subtitle': subtitle,
    'source': source,
    'expiration': expiration,
    'enabled': enabled,
    'message': message
  }}, (err, results) => {
    if(err) return res.status(400).json('Could not update opportunity')
    OpportunityForStudents.find({}, (err, results) => {
      if(err) return res.status(401).json('Could not get opportunities for students')
      res.json(results)
    })
  })
}

exports.deleteStudentOpportunity = (req, res) => {
  OpportunityForStudents.findByIdAndDelete(req.body[0], (err, response) => {
    if(err) res.status(400).json('Error deleting the meeting')
    OpportunityForStudents.find({}, (err, results) => {
      if(err) return res.status(401).json('Could not get opportunities for students')
      res.json(results)
    })
  })
}

exports.listStudentOpportunitiesPublic = (req, res) => {
  OpportunityForStudents.find({}, (err, results) => {
    if(err) return res.status(401).json('Could not get opportunities for faculty')
    res.json(results)
  })
}