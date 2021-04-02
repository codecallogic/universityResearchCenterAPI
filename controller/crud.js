const Announcement = require('../models/announcement')
const Meeting = require('../models/meetings')
const OpportunityForFaculty = require('../models/opportunities-faculty')
const OpportunityForStudents = require('../models/opportunities-students')
const HeaderComponent = require('../models/header')
const StudentProfile = require('../models/student-profile')
const Tags = require('../models/tags')

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

// HEADER COMPONENT
exports.createHeader = (req, res) => {
  const newHeaderComponent = new HeaderComponent(req.body.header)

  newHeaderComponent.save( (err, results) => {
    console.log(err)
    if(err) return res.status(401).json(`Sorry we're having trouble creating the header slide`)
    return res.json('Header slider was created')
  })
    
}

exports.headerList = (req, res) => {
  HeaderComponent.find({}, (err, results) => {
    if(err) return res.status(401).json('Could not get header component data')
    res.json(results)
  })
}

exports.updateHeader = (req, res) => {
  const {id, enabled, headline, subheading, button, buttonLink, imageLeftColumn, imageRightColumn, captionOne, captionTwo} = req.body

  HeaderComponent.findByIdAndUpdate(id, {$set: {
    'enabled': enabled,
    'headline': headline,
    'subheading': subheading,
    'button': button,
    'buttonLink': buttonLink,
    'imageLeftColumn': imageLeftColumn,
    'imageRightColumn': imageRightColumn,
    'captionOne': captionOne,
    'captionTwo': captionTwo
  }}, (err, results) => {
    if(err) return res.status(400).json('Could not update header')
    HeaderComponent.find({}, (err, results) => {
      if(err) return res.status(401).json('Could not get header for faculty')
      res.json(results)
    })
  })
}

exports.deleteHeader = (req, res) => {
  HeaderComponent.findByIdAndDelete(req.body[0], (err, response) => {
    if(err) res.status(400).json('Error deleting the header')
    HeaderComponent.find({}, (err, results) => {
      if(err) return res.status(401).json('Could not get header data')
      res.json(results)
    })
  })
}

exports.headerComponentPublic = (req, res) => {
  HeaderComponent.find({}, (err, results) => {
    if(err) return res.status(401).json('Could not get opportunities for faculty')
    res.json(results)
  })
}

// STUDENT PROFILES
exports.createStudentProfile = (req, res) => {

  delete req.body['researchInterests']
  
  StudentProfile.findOne({$or: [{linkedIn: req.body.student.linkedIn}, {email: req.body.student.email}]}, (err, student) => {
    if(student) return res.status(401).json('You cannot have accounts with duplicate LinkedIn or email for student profile')

    const newStudent = new StudentProfile(req.body.student)

    newStudent.save( (err, results) => {
      if(err) return res.status(401).json(`Sorry we're having trouble creating the student`)
      res.json('Student profile was created successfully')
    })
  })
}

exports.updateStudentProfile = async (req, res) => {
  const tags = req.body['researchInterests']
  delete req.body['researchInterests']

  let found = await Tags.find({tag: tags}, (err, item) => {}).exec()

  // TO CHECK IF TAGS EXISTS IN STUDENT PROFILE REFERENCE USE THESE STRINGS TO CHECK DATA
  let holdFound = [...found]
  holdFound = holdFound.map( (item) => {
    return item._id
  })

  if(found.length > 0){
    found.forEach( (item) => {
      tags.splice(tags.indexOf(found.tag), 1)
    })
  }

  let json = tags.map( (i) => {
    return {"tag": i}
  })
  
  Tags.create(json, (err, item) => {
    
    console.log(err)
    if(err) return res.status(400).json('There was an error saving a tag')

    StudentProfile.findByIdAndUpdate(req.body._id, req.body, (err, updatedStudent) => {
      console.log(err)
      if(err) return res.status(400).json('Could not update student')

      StudentProfile.findById(req.body._id).populate('researchInterests').exec( (err, student) => {
        console.log(err)
        if(err) return res.status(401).json('Could not find student')
        if(item){
          item.forEach( (i) => {
            student.researchInterests.push(i._id)
          })
        }else{
          student.researchInterests.forEach( (item) => {
            const found = holdFound.find( value => value.toString() == item._id)
            student.researchInterests.push(found)
          })
        }

        student.save( (err) => {
          console.log(err)
          if(err) return res.status(401).json('Could not save tags to student model')
          StudentProfile.findById(req.body._id).populate('researchInterests').exec(function(err, doc) {
            console.log(err)
            if(err) return res.status(401).json('Could not get students')
            res.json(doc)
          })
        })
      })
    })
  })
}

exports.findProfile = (req, res) => {
  StudentProfile.findById(req.body.id).populate('researchInterests').exec(function(err, doc) {
    if(err) return res.status(401).json('Could not get student profile')
    res.json(doc)
  })
}

exports.deleteStudentProfile = (req, res) => {
  StudentProfile.findByIdAndDelete(req.body[0], (err, response) => {
    if(err) res.status(400).json('Error deleting the student profile')
    StudentProfile.find({}, (err, results) => {
      if(err) return res.status(401).json('Could not get student profiles')
      res.json(results)
    })
  })
}

exports.studentList = (req, res) => {
  StudentProfile.find({}, (err, results) => {
    if(err) return res.status(401).json('Could not get student data')
    res.json(results)
  })
}

exports.studentProfilesPublic = (req, res) => {
  StudentProfile.find({}, (err, results) => {
    if(err) return res.status(401).json('Could not get student data')
    res.json(results)
  })
}

exports.getStudentProfile = (req, res) => {
  const {id} = req.params

  StudentProfile.findOne({_id: id}, (err, results) => {
    if(err) return res.status(401).json('Could not get student profile')
    return res.json(results)
  })
}