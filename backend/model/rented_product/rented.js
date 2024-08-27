const mongoose = require('mongoose')
const rentedSchema = mongoose.Schema({
    Gharbeti_id: {
        type: String,
        required: true
    },
    Gharbeti_name: {
        type: String,
        required: true
    },
    Gharbeti_profile: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Location: {
        type: String,
        required: true
     
    },
    People: {
        type: String,
        required: true
    }
    ,
    Pets: {
        type: String,
        required: true
    }
    ,
    Category: {
        type: String,
        required: true
    }
    ,
    Parking: {
        type: String,
        required: true
    }
    ,
    Quantity: {
        type: String,
        required: true
    },
    Rate: {
        type: String,
        required: true
    },
    Water: {
        type: String,
        required: true
    }, 
    productImages: [{
        type: String,
        required: true
    }]
    ,
    Date: {type: String,
        required:true},
    name: {
        type: String,
        required: true
    },
    profile:[
        {type: String, required: true}
    ]
})

const rentedModel = mongoose.model('rented', rentedSchema)
module.exports = rentedModel