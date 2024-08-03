const mongoose = require('mongoose')

const imageSchema = mongoose.Schema({
   
    image: [{
        type: String
    }]
})

const imageModel = mongoose.model('image', imageSchema)
module.exports = imageModel