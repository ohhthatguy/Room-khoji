const mongoose = require('mongoose')
const postSchema = mongoose.Schema({
    Gharbeti_id: {
        type: String,
        required: true}, Gharbeti_name: {
        type: String,
        required: true}, Gharbeti_profile: {
        type: String,
        required: true}, Description: {
        type: String,
        required: true }, Location: {
        type: String,
        required: true  
    }, People: {     type: String,
        required: true }, Pets: {
        type: String,
        required: true},Category: {
        type: String,
        required: true},Parking: {
        type: String,
        required: true},Quantity: {
        type: String,
        required: true},Rate: {
        type: String,
        required: true},Water: {
        type: String,
        required: true }, productImages: [{
        type: String,
        required: true}],Date: {type: String,
        required:true}
})

const postModel = mongoose.model('post', postSchema)
module.exports = postModel