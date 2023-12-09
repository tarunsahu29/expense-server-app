const express = require('express')
const dotenv = require('dotenv')
const dbConnect = require('./config/dbConnect')
const { registerUser } = require('./controllers/users/usersCtrl')
const userRoute = require('./routes/users/usersRoute')
const { errorHandler, notFound } = require('./middlewares/errorMiddleware')

const app = express()
//env
dotenv.config()

// const logger = (req, res, next ) => {
//   console.log('logging');
//   next()  
// }
// app.use(logger) 

// db Connect
dbConnect()
app.use(express.json());


//middlewares


 

//routes
app.use('/api/users', userRoute);


//error
app.use(notFound)
app.use(errorHandler)


module.exports = app
