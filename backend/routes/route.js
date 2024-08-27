const express = require('express')

const router = express()


//middleware
const upload = require('../Middleware/upload')
const authorizeToken = require('../Middleware/authorizeToken')


///////////////////////////////


//import from controller
const { saveRentedProduct,getRentedProduct, createNewAccount,checkLogIn,getSignature,getFavDataFromFavPostId,verifyPayment, updatePost,getPostByCategory,saveFavouritePost, getFavouritePost,saveProfilePicture,getGharbetiById,deletePostsOfId, getProfilePicture, getProductPicture,getPostsOfId, savePost} = require('../controller/controller')

//create a new account
router.post('/create/newAccount', createNewAccount)

//login
router.post('/login', checkLogIn)

//save prfile image
router.post('/create/profile', upload.single('image') ,saveProfilePicture)

//get image
router.get('/getProfile', getProfilePicture);

//get user
router.get('/user', getGharbetiById);

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

//get post by category
router.get('/tenant/productmarket', getPostByCategory)

//save favourite post
router.put('/save/favourite', saveFavouritePost)

//get saved favrutire post id
router.get('/get/favourtie/id', getFavouritePost)

//get fav posts
router.get('/get/favourite/posts',getFavDataFromFavPostId)


////easewa//////////////////////////////////////

//get signature
router.get('/get/signature',getSignature)

//check verification
router.get('/check/verification', verifyPayment)


////////////////////////////////////////////////


//save rented product
router.post('/save/rented_product',saveRentedProduct )

//get rented product
router.get('/get/rented_product', getRentedProduct)


module.exports = router