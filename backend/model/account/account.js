const mongoose = require('mongoose')
const accountSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
    ,
    profile: {
        type: String
    }
    ,
    date: {type: Date}
})

const accountModel = mongoose.model('account', accountSchema)
module.exports = accountModel