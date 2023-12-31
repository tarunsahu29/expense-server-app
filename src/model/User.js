const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const mongoosePaginate = require('mongoose-paginate-v2')

//schema
const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, 'First name is required'],
    },
    lastname: {
      type: String,
      required: [true, 'Last name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

//PAGINATION
userSchema.plugin(mongoosePaginate)

//HASH PASSWORD
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10); 
  this.password = await bcrypt.hash(this.password, salt);
  next();
})


//Verify Password
userSchema.methods.isPasswordMatch = async function (enteredPassword) {
  // console.log('Password in the database:', this.password);
  // console.log('Entered password:', enteredPassword);
  return await bcrypt.compare(enteredPassword, this.password)
}

//COMPILE SCHEMA INTO MODEL

const User = mongoose.model('User', userSchema)
module.exports = User
