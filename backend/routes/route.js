const express = require('express')

const router = express()


//middleware
const upload = require('../Middleware/upload')
const authorizeToken = require('../Middleware/authorizeToken')


///////////////////////////////


//import from controller
const {createNewAccount,checkLogIn, saveProfilePicture,getUser, getProfilePicture} = require('../controller/controller')

//create a new account
router.post('/create/newAccount', createNewAccount)

//login
router.post('/login', checkLogIn)

//save prfile image
router.post('/create/profile', upload.single('image') ,saveProfilePicture)

//get image
router.get('/getProfile', getProfilePicture);

//get user
router.get('/user',authorizeToken, getUser);



module.exports = router