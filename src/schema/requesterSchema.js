const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    guildID: String,
    enabled: Boolean
})

module.exports = mongoose.model('requester', Schema);
