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
app.use(cors({credentials: true, origin: process.env.CLIENT_URL}))

// API
app.use('/api', authRoutes)
app.use('/api', userRoutes, (err, req, res, next) => {
  console.log(err)
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('You must login first.');
  }
 })
 app.use('/api', crudRoutes)

const port = process.env.PORT || 3001

app.listen(port, () => console.log(`Server is running on port ${port}`))