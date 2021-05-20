const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
require('./config/database')

// TODO: Change email of Mongo Atlas to Gustavo's email
const app = express()

// ROUTES
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const crudRoutes = require('./routes/crud')

// MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());
app.use('/files/storage', express.static('public'))
app.use(cors({credentials: true, origin: process.env.CLIENT_URL}))

// API
app.use('/api', authRoutes)
app.use('/api', userRoutes, (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    // res.clearCookie('user', { expires: new Date(0), path:'/admin/login'})
    // res.clearCookie('accessToken', { expires: new Date(0) })
    res.status(401).json('Please refresh the page, and login first.');
  }
 })
 
 app.use('/api', crudRoutes, (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    console.log(err)
    res.status(401).json('Please refresh the page, and login first.');
  }
 })

const port = process.env.PORT || 3001

app.listen(port, () => console.log(`Server is running on port ${port}`))