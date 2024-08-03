const ImageModel = require('../model/image/image')
const accountModel = require('../model/account/account')
const Token = require('../model/Token/token')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config();
const mongoose = require('mongoose')
 

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
        // let response = new ImageModel( req.file.filename)


        await response.save()
        console.log('here1')

        return res.status(200).json({msg: 'data save sucesfully'})


    }catch(err){
        console.log('here2')
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

const getUser = async(req,res)=>{
    // console.log(req)
    try{
        const response = await accountModel.find({})

        if(response.length > 0){
            return res.status(200).json({valid:true, response:response})
        }else{
            return res.status(404).json({msg: 'data none'})

        }
    }catch(err){
        return res.status(500).json({msg: 'some error from server side'})
    }
}


module.exports = {createNewAccount, checkLogIn, saveProfilePicture, getUser, getProfilePicture}