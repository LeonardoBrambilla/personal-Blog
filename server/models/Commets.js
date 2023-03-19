const mongoose = require("mongoose")

// Commets create/get 

// Name 
// comments
// data
// IdText
// Id

const CommentsSchema = new mongoose.Schema({
  name: {type: String,required: true},
  comment: {type: String,required: true},
  IdText: {type:String, required:true},
  date: String
})

module.exports = mongoose.model('Comments', CommentsSchema)
