const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const generateNewAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  //  let exist = false;

  // if(!refreshToken){
  //     return res.status(401).json({valid: false ,msg: 'validity for refresh token is off. Please re-login.'})
  // }else{

  // jwt.verify(refreshToken, process.env.SECRET_REFRESH_KEY, (err,user)=>{
  //     if(err){
  //         return res.status(401).json({valid: false ,msg: 'unauthorized refresh token'})
  //     }
  //         const accessToken = jwt.sign({email: req.body.email}, process.env.SECRET_ACCESS_KEY, { expiresIn: '10s' })
  //         res.cookie('accessToken', accessToken, {maxAge: 10000})
  //         exist = true;
  //     })
  // }
  // return  exist

  // if (!refreshToken) {
  //     return res.status(401).json({ valid: false, msg: 'Refresh token required. Please re-login.' });
  // }

  // try {
  //     const user = await jwt.verify(refreshToken, process.env.SECRET_REFRESH_KEY);
  //     console.log(user)
  //     const accessToken = jwt.sign({ email: req.body.email }, process.env.SECRET_ACCESS_KEY, { expiresIn: '10s' });

  //     res.cookie('accessToken', accessToken, { maxAge: 10000 });
  //     return true; // Token successfully refreshed
  // } catch (err) {
  //     return res.status(401).json({ valid: false, msg: 'Unauthorized refresh token' });
  // }

  return new Promise((resolve, reject) => {
    if (!refreshToken) {
      return res
        .status(401)
        .json({
          valid: false,
          msg: "Refresh token required. Please re-login.",
        });
    }

    jwt.verify(refreshToken, process.env.SECRET_REFRESH_KEY, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ valid: false, msg: "Unauthorized refresh token" });
      }

      const accessToken = jwt.sign(
        { email: decoded.email },
        process.env.SECRET_ACCESS_KEY,
        { expiresIn: "10s" }
      );

      res.cookie("accessToken", accessToken, { maxAge: 10000 });
      resolve(true); // Token successfully refreshed
    });
  });
};

module.exports = generateNewAccessToken;
