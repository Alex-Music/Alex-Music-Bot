const mongoose = require('mongoose');

const vcDontleaveSchema = new mongoose.Schema({
    guildID: String,
    voiceChannel: String,
    textChannel: String
})

module.exports = mongoose.model('autojoin', vcDontleaveSchema);
