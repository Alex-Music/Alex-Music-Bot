const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    guildID: String,
    Volume: String,
})

module.exports = mongoose.model('defaultvolumesg', Schema);
