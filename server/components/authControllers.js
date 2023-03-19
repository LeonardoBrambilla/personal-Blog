const User = require("../models/User")
const bcrypt = require("bcryptjs")

exports.login = async (req,res) => {
  const { email } = req.body
  try {    
    const {name, verifyToken, password,role,likes} = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(req.body.password,password)
    if (!isPasswordCorrect) {
      return res.status(400).send("Incorrect password")
    }  
    res.status(200).send({user:{name:name,email:email,role:role,likes:likes},token:verifyToken})
  } catch (error) {
    return res.status(400).send(error)    
  }
}

exports.register = async (req,res) => {
  const {email,name,password} = req.body
  const emailExist = await User.findOne({email})
  if(emailExist) {
    return res.status(400).send("email exist")
  }
  const isFirstAccount = (await User.countDocuments({})) === 0
  const role = isFirstAccount ? 'admin' : 'user'
  const verifyToken = await bcrypt.genSalt(10)
  await User.create({
    name,
    email,
    password,
    role,
    likes,
    verifyToken
  })
  res.status(200).send({user:{name:name,email:email,role:role,likes:likes},token:verifyToken})
}

exports.validate = async (req,res) => {
  const {token} = req.body
  try {    
    const {name, email,role,likes,_id} = await User.findOne({ verifyToken:token });
    res.status(200).send({user:{id:_id,name:name,email:email,role:role,likes:likes}})
  } catch (error) {
    res.status(400).send(error)    
  }
}

exports.getAllUsers = async (req,res) => {
  const data = await User.find({})
  res.status(200).send(data)
}

exports.removeUser = async (req,res) => {
  const {email} = req.body
  const user = await User.findOne({email:email})
  if(!user){
    return res.status(400).send("Error")
  }
  user.remove()
  res.status(200).send(email)
}