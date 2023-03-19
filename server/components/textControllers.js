const Text = require("../models/Text")
const Comment = require("../models/Commets")
const User = require("../models/User")
const ObjectId = require('mongodb').ObjectId;

exports.createText = async (req,res) => {
  const {text,title} = req.body
  const date = new Date()
  await Text.create({title:title,text:text,date:`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`})
  res.status(200).json(req.body)
}

exports.getAllText = async (req,res) => { 
  const text = await Text.find({})
  const newtext = []
  const comment = await Comment.find({})
  text.map(e=>(newtext.push({_id:e._id,text:e.text,likes:e.likes.length,date:e.date,title:e.title,comment:comment.filter(y=>y.IdText==ObjectId(e)).length})))
  res.status(202).json({text:newtext,comment:comment})
}

exports.getText = async (req,res) => {
  const {IdText} = req.params
  const {name} = req.body
  const text = await Text.findOne({_id:IdText})
  const comment = await Comment.find({IdText:IdText})
  res.status(200).json({text:{_id:text._id,text:text.text,likes:text.likes.length,date:text.date,title:text.title},comment:comment})
}

exports.deleteText = async (req,res) => {
  const {id} =  req.params
  const text = await Text.findOne({_id:id})
  if(!text) {
    res.stauts(404).send("Not Found")
  }
  await text.remove()
  res.status(200).json({msg:"Deleted with success"})
}

exports.giveLike = async (req,res) => {
  const {id} = req.params
  const {name} = req.body
  const text = await Text.findOne({_id:id})
  const user = await User.findOne({name:name})
  const like = text.likes.some(e=>(e === name))
  if(like ) {    
    return res.status(202).json("remove")
  }
  const newlike = [...text.likes,name]
  const userLike = [...user.likes,id]
  await User.findOneAndUpdate({name:name},{likes:userLike})
  await Text.findOneAndUpdate({_id:id},{likes:newlike})
  res.status(202).json()
}

exports.removeLike = async (req,res) => {
  const {id} = req.params
  const {name} = req.body
  const text = await Text.findOne({_id:id})
  const user = await User.findOne({name:name})
  text.likes.splice(text.likes.indexOf(name),1)
  const like = user.likes.some(e=>(e === id))
  if(!like) {
    return res.status(400).json("error")
  }  
  user.likes.splice(user.likes.indexOf(id),1)
  await User.findOneAndUpdate({name:name},{likes:user.likes})
  await Text.findOneAndUpdate({_id:id},{likes:text.likes})
  res.status(202).json()
}
