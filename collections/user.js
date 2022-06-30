const User = require('../models/userSchema')
const { hash } = require('bcrypt')
const jwt = require('jsonwebtoken')
exports.signUp = async (req, res) => {
  try {
    //console.log(req.body);
    const { firstName, lastName, email, password,userName } = req.body
    const profilePicture = req.file && req.file.profilePicture

    const _userexist = await User.findOne({ email: req.body.email }).exec()
    console.log(_userexist)
    if (_userexist) {
      res.status(400).json({ message: 'user exist' })
    } else {
      const hashedPassword = await hash(password, 10)
      const add_user = await User.create({
        firstName,
        lastName,
        email,
        hashedPassword,
        userName,
        profilePicture
      })
      if (add_user) {
        return res.status(200).json({
          message: 'user added'
        })
      } else {
        return res.status(500).json({ message: 'something wrong....!!!' })
      }
    }
  } catch (error) {
    console.log(error)
  }
}
exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body
    console.log(password)
    const _user = await User.findOne({ email: email }).exec()
    if (_user) {
      if (await _user.PasswordCompare(req.body.password)) {
        //console.log(process.env.SECRET);
        const token = jwt.sign(
          { _id: _user._id, name: _user.firstName },
          process.env.SECRET,
          { expiresIn: '5h' }
        )
        res
          .status(200)
          .json({ message: 'password is correct', token, user: _user })
      } else {
        return res.status(300).json({ message: 'pasword is wrong' })
      }
    } else {
      return res.status(400).json({ message: 'user not exist' })
    }
  } catch (error) {
    console.log(error)
  }
}
exports.is_User_In = async (req, res, next) => {
  console.log('hyyy')
  console.log(req.headers.authorization)
  const Header = req.headers.authorization
  const verifyToken = jwt.verify(Header, process.env.SECRET)
  req.user = verifyToken
  next()
}
exports.GetUserDetails = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).exec()
    if (user) {
      return res.status(200).json({ user })
    } else {
      return res.status(400).json({ message: 'user doesnt available' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}
exports.UpdateUser = async (req, res) => {
  try {
    console.log(req.file)
    const profilePicture = req.file && req.file.filename
    const update = await User.findOneAndUpdate(
      { _id: req.body._id },
      {
        _id: req.body._id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        userName: req.body.userName,
        profilePicture
      }
    )
    if (update) {
      res.status(200).json({ message: 'succesfully', profilePicture })
    }
  } catch (error) {
    console.log(error)
  }
}
