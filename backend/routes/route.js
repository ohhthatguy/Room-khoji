const express = require('express')

const router = express()


//middleware
const upload = require('../Middleware/upload')
const authorizeToken = require('../Middleware/authorizeToken')


///////////////////////////////


//import from controller
const {createNewAccount,checkLogIn, updatePost, saveProfilePicture,getUser,deletePostsOfId, getProfilePicture, getProductPicture,getPostsOfId, savePost} = require('../controller/controller')

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

//save product picture
router.post('/save/product/picture',upload.array('image'),getProductPicture)

//save Post
router.post('/save/post', savePost)

//get Post of Id
router.get('/get/post', getPostsOfId)

//delete post by id
router.delete('/delete/post', deletePostsOfId)

//update post 
router.put('/update/post', updatePost)



module.exports = router