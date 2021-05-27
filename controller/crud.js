const Announcement = require('../models/announcement')
const Meeting = require('../models/meetings')
const OpportunityForFaculty = require('../models/opportunities-faculty')
const OpportunityForStudents = require('../models/opportunities-students')
const HeaderComponent = require('../models/header')
const StudentProfile = require('../models/student-profile')
const Tags = require('../models/tags')
const Webpage = require('../models/webpage')
const multer = require('multer')
const path  = require('path')

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

let storageHeader = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname )
  }
})

let upload = multer({ storage: storage }).single('file')
let headerUpload = multer({ storage: storageHeader }).fields([{name: 'imageLeftColumn'}, {name: 'imageRightColumn'}])


// ANNOUNCEMENTS
exports.createAnnouncement = (req, res) => {
  // console.log(req.body)
  upload(req, res, function (err) {
    const {title, subtitle, imageDescr, primary, message, nanoid} = req.body
    let imageURL = req.file ? req.file.filename : null

    // console.log(req.body)
    // console.log(imageURL)
    
    if (err instanceof multer.MulterError) {
        console.log(err)
        return res.status(500).json(err)
    } else if (err) {
        console.log(err)
        return res.status(500).json(err)
    }

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

      const newAnnouncement = new Announcement({title, subtitle, imageURL, imageDescr, nanoid, primary, message})

      newAnnouncement.save( (err, results) => {
        if(err) return res.status(401).json(`Sorry we're having trouble posting the announcement`)
        res.json('Announcement has been posted')
      })
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
  upload(req, res, function (err) {
    console.log(req.body)
    console.log(req.file)

    const {id, title, subtitle, imageURL, imageDescr, primary, enabled, message} = req.body

    let imageURLForm = req.file ? req.file.filename : imageURL

    if (err instanceof multer.MulterError) {
      console.log(err)
      return res.status(500).json(err)
    } else if (err) {
      console.log(err)
        return res.status(500).json(err)
    }

    let newPrimary = primary == 'true' ? true : false
  
    Announcement.findByIdAndUpdate(id, {$set: {
      'title': title,
      'subtitle': subtitle,
      'imageURL': imageURLForm,
      'imageDescr': imageDescr,
      'primary': primary,
      'enabled': enabled,
      'message': message
    }}, { upsert: true, new: true }, (err, results) => {
      console.log(err)
      if(err) return res.status(400).json(err.codeName ? `${err.codeName}, you can't have two primary announcements`: 'Could not update category')
      Announcement.find({}, (err, results) => {
        console.log(results)
        if(err) return res.status(401).json('Could not get announcements')
        res.json(results)
      })
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
  headerUpload(req, res, function (err) {
    console.log(req.body)
    console.log(req.files)

    if (err instanceof multer.MulterError) {
      console.log(err)
      return res.status(500).json(err)
    } else if (err) {
      console.log(err)
        return res.status(500).json(err)
    }

    req.body.imageLeftColumn = req.files.imageLeftColumn[0].filename
    req.body.imageRightColumn = req.files.imageRightColumn[0].filename
    
    const newHeaderComponent = new HeaderComponent(req.body)

    newHeaderComponent.save( (err, results) => {
      err ? console.log(err) : null
      console.log(results)
      if(err) return res.status(401).json(`Sorry we're having trouble creating the header slide`)
      return res.json('Header slider was created')
    })
  })
}

exports.headerList = (req, res) => {
  HeaderComponent.find({}, (err, results) => {
    if(err) return res.status(401).json('Could not get header component data')
    res.json(results)
  })
}

exports.updateHeader = (req, res) => {
  headerUpload(req, res, function (err) {
    console.log(req.files)
    console.log(req.body)

    if (err instanceof multer.MulterError) {
      console.log(err)
      return res.status(500).json(err)
    } else if (err) {
      console.log(err)
        return res.status(500).json(err)
    }
    
    const {id, enabled, headline, subheading, button, buttonLink, captionOne, captionTwo, imageLeftColumn, imageLeftColumnURL, imageRightColumn, imageRightColumnURL} = req.body

    HeaderComponent.findByIdAndUpdate(id, {$set: {
      'enabled': enabled,
      'headline': headline,
      'subheading': subheading,
      'button': button,
      'buttonLink': buttonLink,
      'imageLeftColumn': req.files.imageLeftColumn ? req.files.imageLeftColumn[0].filename : imageLeftColumnURL,
      'imageRightColumn': req.files.imageRightColumn ? req.files.imageRightColumn[0].filename : imageRightColumnURL,
      'captionOne': captionOne,
      'captionTwo': captionTwo
    }}, (err, results) => {
      if(err) return res.status(400).json('Could not update header')
      HeaderComponent.find({}, (err, results) => {
        if(err) return res.status(401).json('Could not get header for faculty')
        res.json(results)
      })
    })
  })
}

exports.deleteHeader = (req, res) => {
  HeaderComponent.findByIdAndDelete(req.body[0], (err, response) => {
    console.log(err)
    if(err) res.status(400).json('Error deleting the header')
    HeaderComponent.find({}, (err, results) => {
      console.log(err)
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
  upload(req, res, async function (err) {
    let photo = req.file ? req.file.filename : null
    console.log(req.file)
    console.log(req.body)

    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }
    
    let tags = req.body.researchInterests.split(',')
    let addBackTags = req.body.researchInterests.split(',')
    delete req.body.researchInterests
    
    let found = await Tags.find({tag: tags}, (err, item) => {}).exec()

    // TO CHECK IF TAGS EXISTS IN STUDENT PROFILE REFERENCE USE THESE STRINGS TO CHECK DATA
    let holdFound = [...found]
    holdFound = holdFound.map( (item) => {
      return item._id
    })

    if(found.length > 0){
      found.forEach( (item) => {
        tags = tags.filter( (i) => {return i !== item.tag})
      })
    }

    let json = tags.map( (i) => {
      return {"tag": i}
    })

    console.log(json)

    Tags.create(json, (err, item) => {
    console.log(err._message)
    if(err) {
      if(err._message) return err._message == 'Tags validation failed' ? true : null
      if(!err._message) return res.status(400).json( err.code == 11000 ? 'Could not save duplicate tags' : 'There was an error saving a tag')
    }

      Tags.find({tag: addBackTags}, (err, tag) => {
      
        req.body.researchInterests = []  
        
        if(tag){
          tag.forEach( (i) => {
            req.body.researchInterests.push(i._id)
          })
        }

        StudentProfile.findOne({$or: [{linkedIn: req.body.linkedIn}, {email: req.body.email}]}, (err, student) => {
          if(student) return res.status(401).json('You cannot have accounts with duplicate LinkedIn or email for student profile')

          req.body.photo = photo
          
          const newStudent = new StudentProfile(req.body)

          newStudent.save( (err, results) => {
            console.log(results)
            if(err) return res.status(401).json(`Sorry we're having trouble creating the student`)
            res.json('Student profile was created successfully')
          })
        })
      })
    })
  })
}

exports.updateStudentProfile = async (req, res) => {
  upload(req, res, async function (err) {
    console.log(req.body)
    console.log(req.file)
    let photo = req.file ? req.file.filename : req.body.photo
    let tags = req.body.researchInterests.split(',')
    let tagsToRemove = req.body.tagsToRemove ? req.body.tagsToRemove.split(',') : null
    delete req.body.researchInterests

    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }

    let found = await Tags.find({tag: tags}, (err, item) => {}).exec()

    // TO CHECK IF TAGS EXISTS IN STUDENT PROFILE REFERENCE USE THESE STRINGS TO CHECK DATA
    let holdFound = [...found]
    holdFound = holdFound.map( (item) => {
      return item._id
    })

    if(found.length > 0){
      found.forEach( (item) => {
        tags = tags.filter( (i) => {return i !== item.tag})
      })
    }

    let json = tags.map( (i) => {
      return {"tag": i}
    })
    
    Tags.create(json, (err, item) => {
      console.log(err._message)
      if(err) {
        if(err._message) return err._message == 'Tags validation failed' ? true : null
        if(!err._message) return res.status(400).json( err.code == 11000 ? 'Could not save duplicate tags' : 'There was an error saving a tag')
      }

      req.body.photo = photo
      
      StudentProfile.findByIdAndUpdate(req.body._id, req.body, (err, updatedStudent) => {
        console.log(err)
        // console.log(err)
        if(err) return res.status(400).json('Could not update student')

        StudentProfile.findById(req.body._id).populate('researchInterests').exec( (err, student) => {
          console.log(err)
          if(err) return res.status(401).json('Could not find student')
          
          if(item){
            // ADD TAGS THAT WERE JUST CREATED

            item.forEach( (i) => {
              student.researchInterests.push(i._id)
            })
          }else{
            // ADD TAGS THAT ARE NOT IN STUDENT PROFILE BUT EXIST IN TAG DATA MODEL
            
            let tagsInProfile = []
            if(student.researchInterests){
              tagsInProfile = student.researchInterests.map( (tag) => {
                return tag._id
              })
            }          
            
            holdFound.forEach( (item) => {
              let found
              if(tagsInProfile){
                found = tagsInProfile.find( value => value.toString() == item)
              }

              found ? null : (student.researchInterests.push(item))
            })
          }

          if(tagsToRemove){
            // REMOVE TAGS FROM STUDENT PROFILE
            let newArray = student.researchInterests.filter( (item) => {
              if(item.tag){
                if(tagsToRemove.indexOf(item.tag.toString()) == -1) return item
              }else{
                return item
              }
            })

            let ids = []
            if(newArray){
              ids = newArray.filter( (item) => item)
            }

            student.researchInterests = ids
          }

          student.save( (err, results) => {
            // console.log(err)
            if(err) return res.status(401).json('Could not save tags to student model')
            StudentProfile.findById(req.body._id).populate('researchInterests').exec(function(err, doc) {
              if(err) return res.status(401).json('Could not get students')
              res.json(doc)
            })
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

  StudentProfile.findById(id).populate('researchInterests').exec(function(err, doc) {
    if(err) return res.status(401).json('Could not get student profile')
    return res.json(doc)
  })
}

exports.findProfilePublic = (req, res) => {
  StudentProfile.findById(req.body.id).populate('researchInterests').exec(function(err, doc) {
    if(err) return res.status(401).json('Could not get student profile')
    res.json(doc)
  })
}

exports.createWebpage = (req, res) => {
  Webpage.findOne({heading: req.body.webpage.heading}, (err, webpage) => {
    if(webpage) return res.status(401).json('You cannot have a webpage with duplicate headings')

    const newWebpage = new Webpage(req.body.webpage)

    newWebpage.save( (err, results) => {
      if(err) return res.status(401).json(`Sorry we're having trouble creating the webpage`)
      res.json('Webpage was created successfully')
    })
  })
}

exports.webpageList = (req, res) => {
  Webpage.find({}, (err, results) => {
    if(err) return res.status(401).json('Could not get webpage data')
    res.json(results)
  })
}

exports.updateWebpage = (req, res) => {
  Webpage.findByIdAndUpdate(req.body.edit._id, req.body.edit, (err, results) => {
    if(err) return res.status(400).json('Could not update webpage')
    Webpage.find({}, (err, results) => {
      if(err) return res.status(401).json('Could not get webpage content for students')
      res.json(results)
    })
  })
}

exports.deleteWebpage = (req, res) => {
  Webpage.findByIdAndDelete(req.body[0], (err, response) => {
    if(err) res.status(400).json('Error deleting the webpage')
    Webpage.find({}, (err, results) => {
      if(err) return res.status(401).json('Could not get webpages')
      res.json(results)
    })
  })
}

exports.getWebpageContent = (req, res) => {
  Webpage.findById(req.params.id, (err, doc) => {
    if(err) return res.status(401).json('Could not get webpage content')
    return res.json(doc)
  })
}