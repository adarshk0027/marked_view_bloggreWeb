var express = require('express')
var router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/userSchema')
const { hash } = require('bcrypt')
const dotenv = require('dotenv')
const { once } = require('../app')
const {
  signUp,
  signIn,
  is_User_In,
  GetUserDetails,
  UpdateUser
} = require('../collections/user')
const { upload } = require('../multer/multer')
dotenv.config()
mongoose.connect(process.env.DB_NAME)
mongoose.connection
  .once('open', () => console.log('DataBase Connected SuccesFully'))
  .on('error', error => console.log('Database error Happens::::::', error))

/* GET users listing. */

router.post('/signup',upload.single('profilePicture'),signUp)
router.post('/signin', signIn)
router.post('/update',upload.single('profilePicture'),UpdateUser)
router.get('/get-user/:id', GetUserDetails)

module.exports = router
