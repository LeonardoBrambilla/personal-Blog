const mongoose = require("mongoose")

// Texts

// Text
// Title
// data
// likes
// Comments
// Id

const TextSchema = new mongoose.Schema({
  title:{type: String,required: true},
  text: {type: String,required: true},
  likes: {type:[String]},
  comments: {type:[String]},
  date: String
})

module.exports = mongoose.model('Text', TextSchema)
