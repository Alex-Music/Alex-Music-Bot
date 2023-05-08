const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    UserID: String,
    
})

module.exports = mongoose.model('blacklistschema', Schema);
