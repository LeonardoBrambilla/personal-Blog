const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser")
const app = express()
app.use(bodyParser.json())

const {
  login,
  register,
  validate,
  getAllUsers,
  removeUser
} = require("../components/authControllers")

const {
  createText,
  getAllText,
  deleteText,
  getText,
  giveLike,
  removeLike
} = require("../components/textControllers")

const {
  createComment,
  getAllComments
} = require("../components/commentControllers")
  
router.post('/login',login) 

router.post('/register',register)

router.post('/validate',validate)

router.post('/getAllUsers',getAllUsers)

router.post("/removeUser",removeUser)

router.post('/createText',createText)

router.get('/getAllText',getAllText)

router.get("/getText/:IdText",getText)

router.post("/createComment/:IdText",createComment)

router.patch("/giveLike/:id",giveLike)

router.patch("/removeLike/:id",removeLike)

module.exports = router



