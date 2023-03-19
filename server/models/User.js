const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")

// User create/get

// Name
// Email
// Password
// role

const UserSchema = new mongoose.Schema({
  name:{
    type:String
  },
  email:{
    type:String
  },
  password: {
    type: String
  },
  likes: {
    type:[String]
  },
  role: {
    type: String,
    default: 'user',
  },
  verifyToken: String
})

UserSchema.pre('save',async function () {
  if(!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password,salt)
})

module.exports = mongoose.model("User",UserSchema)