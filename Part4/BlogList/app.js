const express = require('express')
const app = express()
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const { errorHandler, unknownEndpoint } = require('./utils/Middelware')


app.use(express.json())

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas successfully! 🎉')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message)
  })

app.use("/api/blogs", blogsRouter)

app.use(unknownEndpoint)

app.use(errorHandler)

module.exports = app