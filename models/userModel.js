var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var userModel = new Schema({
    firstName: { type: String },
    lastName:  { type: String },
    jobTitle:  { type: String },
    isFulltime:  { type: Boolean, dafault: true },
})

module.exports = mongoose.model('User', userModel)