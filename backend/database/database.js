const mongoose = require('mongoose')

 const connection = async(DB_URL) =>{

    try{
      await mongoose.connect(DB_URL)
      console.log("Database is connected succesfully")
    }catch(err){
        console.log("Database is not connected succesfully due to error. ERROR: ", err)
    }
}

module.exports = connection;
