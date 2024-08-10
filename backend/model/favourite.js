const mongoose = require('mongoose')
const favouriteSchema = mongoose.Schema({
    Tenant_id: {
        type: String,
        required: true
    },
    Post_id: [{
        type: String,
        required: true
    }]
})

const favouriteModel = mongoose.model('favourite', favouriteSchema)
module.exports = favouriteModel