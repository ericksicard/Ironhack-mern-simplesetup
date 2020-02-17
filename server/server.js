import path from 'path'
import express from 'express'
import { MongoClient } from 'mongodb'
import mongoose from 'mongoose'
import template from './../template'
import config from './../config/config'
import app from './express'
//comment out before building for production
import devBundle from './devBundle'

//const app = express()  --> now created at express.js

//comment out before building for production
//devBundle.compile(app)

//const CURRENT_WORKING_DIR = process.cwd()
//app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

app.get('/', (req, res) => {
  res.status(200).send(template())
})

app.listen(config.port, (err) => {
  if (err) {
  console.log(err)
  }
  console.info('Server started on port %s.', config.port)
  })

// Setting up Mongoose
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri)

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`)
  })

// Database Connection URL
//const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernSimpleSetup'  --> now using config.js
// Use connect method to connect to the server
MongoClient.connect(config.mongoUri, (err, db)=>{
  console.log("Connected successfully to mongodb server")
  db.close()
})
