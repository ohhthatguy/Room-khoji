const jwt = require('jsonwebtoken')
const generateNewAccessToken = require('./generateNewAccessToken')
const dotenv = require('dotenv').config()

const authorizeToken = async(req,res,next)=>{
    
    const accessToken = req.cookies.accessToken;
    
        if (!accessToken) {
            // Try to generate a new access token
            const success = await generateNewAccessToken(req, res);
    
            if (success) {
                // Retry the original request after generating a new token
                return next();
            }
            // If token generation failed, the response will already have been sent
            return;
        }else{

            jwt.verify(accessToken, process.env.SECRET_ACCESS_KEY, (err,decoded)=>{
                if(err){
                    return res.status(401).json({valid: false ,msg: 'unauthorized access user'})
                }
                req.email = decoded.email
                // console.log(req)
                next()
            })
        }



}

module.exports = authorizeToken