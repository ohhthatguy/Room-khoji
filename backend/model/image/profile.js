const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
   
    profile: {
        type: String
    }
})

const profileModel = mongoose.model('profile', profileSchema)
module.exports = profileModel