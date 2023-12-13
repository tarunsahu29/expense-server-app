const expressAsyncHandler = require('express-async-handler')
const generateToken = require('../../middlewares/generateToken')
const User = require('../../model/User')

//REGISTER
const registerUser = expressAsyncHandler(async (req, res) => {
  const { email, firstname, lastname, password } = req?.body
  //check if user exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    throw new Error('User already exists')
  }
  try {
    const user = await User.create({ email, firstname, lastname, password })
    res.status(200).json(user)
  } catch (error) {
    res.json(error)
  }
})

//FETCH ALL USERS

const fetchUsersCtrl = expressAsyncHandler(async (req, res) => {
  const { page } = req?.query
  try {
    const users = await User.paginate({}, { limit: 2, page: Number(page) })
    res.json(users)
  } catch (error) {
    res.json(error)
  }
})

//LOGIN
const loginUserCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req?.body
  //Find user in database
  const userFound = await User.findOne({ email })
  //check if user password matches
  if (userFound && (await userFound?.isPasswordMatch(password))) {
    res.json({
      _id: userFound?._id,
      firstname: userFound?.firstname,
      lastname: userFound?.lastname,
      email: userFound?.email,
      isAdmin: userFound?.isAdmin, 
      token: generateToken(userFound?._id), 
    })
  }
  else {
    res.status(401)
    throw new Error('Invalid login credentials')
  }
  
})

module.exports = { registerUser, fetchUsersCtrl, loginUserCtrl }
