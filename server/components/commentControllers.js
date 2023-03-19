const Comment = require("../models/Commets")
const Text = require("../models/Text")

exports.createComment = async (req,res) => {
  const {name,comment} = req.body
  console.log(name)
  const {IdText} = req.params

  const text = await Text.findOne({_id:IdText})
  
  const newComment = [...text.comments,name]
  await Text.findOneAndUpdate({_id:IdText},{comments:newComment})

  const date = new Date()
  await Comment.create({name:name,comment:comment,IdText:IdText,date:`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`})
  res.status(200).json(req.body)
}

