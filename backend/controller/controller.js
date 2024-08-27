const ImageModel = require('../model/image/image')
const accountModel = require('../model/account/account')
const postModel = require('../model/account/post')
const favouriteModel = require('../model/favourite')
const rentedModel = require('../model/rented_product/rented')
const bcrypt = require('bcrypt')
const crypto = require("crypto");
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');


const createNewAccount = async(req,res)=>{
 
        try{
            const hashedPswrd = await bcrypt.hash(req.body.password,10)
            const hashedUser = {...req.body,password: hashedPswrd}
       
            let response = new accountModel(hashedUser)
         

            await response.save()
            return res.status(200).json({msg: 'data save sucesfully'})

        }catch(err){
            return res.status(500).json({msg: 'data did not save sucesfully. ERROR: ', err})

        }


}

const checkLogIn = async(req,res)=>{
    
  
        const response = await accountModel.findOne({email: req.body.email})

        if(!response){
            return res.status(404).json({msg: "there is no account with such email."})
        }

        //added
       
        try{
            let isValid = await bcrypt.compare(req.body.password, response.password)

            if(isValid){ //if password is also right, user is valid and create token
                // const accessToken = jwt.sign(response.toJSON(), process.env.SECRET_ACCESS_KEY, { expiresIn: '10s' })
                // const refreshToken = jwt.sign(response.toJSON(), process.env.SECRET_REFRESH_KEY, {expiresIn: '2min'})
                
                const accessToken = jwt.sign({email: req.body.email}, process.env.SECRET_ACCESS_KEY, { expiresIn: '10s' })
                const refreshToken = jwt.sign({email: req.body.email}, process.env.SECRET_REFRESH_KEY, {expiresIn: '30s'})
                

            
                res.cookie('accessToken', accessToken, {maxAge: 10000})
                res.cookie('refreshToken', refreshToken, {maxAge: 30000, httpOnly: true,secure: true })

    
                // after confirming the valid user and also saving the token return back the accesstoken, refershtoken, name and email to frontend for us to use it
                let data = {accessToken: accessToken, refreshToken: refreshToken, response: response}
                return res.status(200).json(data)

    
            }else{
                return res.status(400).json({msg: `Password doesn't match !`})
            }

        }catch(err){
           
            return res.status(500).json({msg: `error while login in with data`})
        }

}

const saveProfilePicture = async(req,res)=>{

    console.log(req.file.filename)
    // console.log(req.files[0])

    try{
        let response = new ImageModel({image: req.file.filename})


        await response.save()
        console.log('here1')

        return res.status(200).json({msg: 'data save sucesfully'})


    }catch(err){
        // console.log('here2')
        return res.status(500).json({msg: 'data did not save sucesfully. ERROR: ', err})

    }

}

const getProfilePicture = async(req,res)=>{
    try{
        // console.log(req)
        const response = await accountModel.findOne({profile: req.params.profile})
        
        if(!response){
            return  res.status(404).json({msg:'no such image'})
        }
        let profilePic = `http://localhost:6969/profile/${response.profile}`
        console.log(profilePic)

        return res.status(200).json(profilePic)
    }catch(err){
        return res.status(500).json('error', err)
    }
}

const getGharbetiById = async(req,res)=>{
    // console.log(req.query)
    try{
        const response = await accountModel.find({ _id: { $in: req.query.id } }) //lot of id i.e id:ids

        if(response.length > 0){
            return res.status(200).json(response)
        }else{
            return res.status(404).json({msg: 'data none'})

        }
    }catch(err){
        return res.status(500).json({msg: 'some error from server side'})
    }
}

const getProductPicture = async(req,res)=>{
    
    // console.log(req.file.filename)
        
    // try{
    //     let response = new ImageModel({image: req.file.filename})
    //     // let response = new ImageModel( req.file.filename)


    //     await response.save()
    //     console.log('here1')

    //     return res.status(200).json({msg: 'data save sucesfully'})


    // }catch(err){
    //     console.log('here2')
    //     return res.status(500).json({msg: 'data did not save sucesfully. ERROR: ', err})

    // }
    if(!req.files){
        return res.status(404).json({msg: "no files were found to upload"})
    }

    let endPoints = [];
    req.files.map((e)=>{
        endPoints = [...endPoints,`http://localhost:6969/profile/${e.filename}`]
    })
    // console.log(endPoints)

    return res.status(200).json(endPoints)


   
}

const savePost = async(req,res)=>{
    // console.log(req.body)

    try{

        

        let response = new postModel(req.body)
         

        await response.save()
        return res.status(200).json({msg: 'post saved/updated'})

    }catch(err){
        return res.status(500).json(err)
    }


}

const getPostsOfId = async(req,res)=>{
    // console.log(req.query)
    try{
        let response;
        if(req.query.postId){
             response = await postModel.find({_id: req.query.postId})
        }else{
             response = await postModel.find({Gharbeti_id: req.query.Gharbeti_id})

        }

        if(response){
            return res.status(200).json(response)
        }else{
            return res.status(404).json({msg: 'data none'})

        }
    }catch(err){
        return res.status(500).json({msg: 'some error from server side'})
    }
}

const deletePostsOfId = async(req,res)=>{
    try{

        let response = await postModel.findOne({_id: req.query._id})

        if(!response){
            return res.status(404).json({msg: "data to delete is not in database"})
        }

        await postModel.deleteOne({_id: req.query._id})
        return res.status(200).json({msg: "data is delete successfully"})

    }catch(err){
        return res.status(500).json({msg: "error while deleting the blog is, " + err})
        

    }
}

const updatePost = async(req,res)=>{

        try{

          await postModel.findByIdAndUpdate(req.body._id, {
                $set: req.body
            })

            return res.status(200).json({msg: 'post successfully updated!!'})


        }catch(err){
            return res.status(500).json(err)
        }


}

const getPostByCategory = async(req,res)=>{
    // console.log(req)
    try{
        const response = await postModel.find({Category: req.query.Category})

        if(response){
            return res.status(200).json(response)
        }else{
            return res.status(404).json({msg: 'data none'})

        }
    }catch(err){
        return res.status(500).json({msg: 'some error from server side'})
    }
}

const saveFavouritePost = async(req,res)=>{
    // console.log(req.query)
    const {Post_id} = req.query
    const {Tenant_id} = req.query
   

    try{

        let data = await favouriteModel.find({Tenant_id: Tenant_id})

        if(data.length > 0){

            if( !(data[0].Post_id.includes(Post_id))){ //dont in list already
                req.query.Post_id = [...data[0].Post_id, Post_id]

            }else{ //it is in list already
                let temp = (data[0].Post_id.filter((item)=> item !== Post_id))
                req.query.Post_id = temp
            }

        }

        // console.log(req.query)
       
      
        let response = await favouriteModel.updateOne({Tenant_id: Tenant_id}, 
            {$set:  req.query},
            {upsert: true}
        )
        // console.log(response)

        return res.status(200).json({msg: req.query.Post_id})

    }catch(err){
        console.log("here1")
        return res.status(500).json(err)
    }


}

const getFavouritePost = async(req,res)=>{
    //gets id of fav posts 
    try{
        const response = await favouriteModel.find({Tenant_id: req.query.id})
    

        if(response){
            return res.status(200).json({initializeBookmark: response})
        }else{
            return res.status(404).json({msg: 'data none'})

        }
    }catch(err){
        return res.status(500).json({msg: 'some error from server side'})
    }
}

const getFavDataFromFavPostId = async(req,res)=>{
    try{
        // console.log('here' )

        // console.log(req.query.id )
        const response = await postModel.find({ _id: { $in: req.query.id } })  
        // console.log(response)
        return res.status(200).json(response)


    }catch(err){
        return res.status(500).json(err)
    }

}


/////esewa

async function getEsewaPaymentHash( amount, transaction_uuid ) {
    try {
      const data = `total_amount=${amount},transaction_uuid=${transaction_uuid},product_code=${process.env.ESEWA_PRODUCT_CODE}`;
  
      const secretKey = process.env.ESEWA_SECRET_KEY;
      const hash = crypto
        .createHmac("sha256", secretKey)
        .update(data)
        .digest("base64");
  
      return {
        signature: hash,
        signed_field_names: "total_amount,transaction_uuid,product_code",
      };
    } catch (error) {
      throw error;
    }
  }

  const getSignature = async(req,res)=>{

    // total_amount=100,transaction_uuid=11-201-13,product_code=EPAYTEST
    const {total_amount} = req.query
    let transaction_uuid = uuidv4()
    //get hashed
    try{
        let hash = await getEsewaPaymentHash(total_amount, transaction_uuid)
        // console.log(total_amount)
        // console.log(transaction_uuid)
        // console.log(hash.signature)
        hash = {...hash, transaction_uuid: transaction_uuid, total_amount: total_amount}
        // console.log(hash)
        return res.status(200).json(hash)

    }catch(err1){
        console.log('error at hasing: ', err1)
        return res.status(500).json(err1)
    }




 
}
  
async function verifyEsewaPayment(encodedData) {
    try {
      // decoding base64 code revieved from esewa
      let decodedData = atob(encodedData);
      decodedData = await JSON.parse(decodedData);
   
      const data = `transaction_code=${decodedData.transaction_code},status=${decodedData.status},total_amount=${decodedData.total_amount},transaction_uuid=${decodedData.transaction_uuid},product_code=${process.env.ESEWA_PRODUCT_CODE},signed_field_names=${decodedData.signed_field_names}`;
  
      const secretKey = process.env.ESEWA_SECRET_KEY;
      const hash = crypto
        .createHmac("sha256", secretKey)
        .update(data)
        .digest("base64");
  
    //   console.log(hash);
    //   console.log(decodedData);
     
      if (hash !== decodedData.signature) {
        throw { message: "Invalid Info", decodedData };
      }

    //   console.log('here1')
      
      return decodedData

    } catch (error) {
      throw error;
    }
  }

const verifyPayment = async(req,res)=>{
    const {data} = req.query
    // console.log(data)

    try{
        let response = await verifyEsewaPayment(data)

        // console.log(response)
        return res.status(200).json(response)

    }catch(err){
        return res.status(500).json(err)
    }
    
}

////


//save rented product
const saveRentedProduct = async(req,res)=>{
    // console.log(req.body)
    try{
        //save rented data
        let response = new rentedModel(req.body)
        await response.save()
        return res.status(200).json({msg: 'post saved/updated'})

    }catch(err){
        return res.status(500).json(err)
    }
}

const getRentedProduct = async(req,res)=>{
    try{
        const response = await rentedModel.find({})
    
        if(response){
            return res.status(200).json(response)
        }else{
            return res.status(404).json({msg: 'data none'})

        }
    }catch(err){
        return res.status(500).json({msg: 'some error from server side'})
    }
}




module.exports = {saveRentedProduct,getRentedProduct, verifyPayment,getSignature,getFavouritePost,getFavDataFromFavPostId, getPostByCategory,saveFavouritePost,getPostsOfId,createNewAccount,deletePostsOfId, checkLogIn,updatePost, saveProfilePicture, getGharbetiById, getProfilePicture, getProductPicture,savePost}