const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    guildID: String,
    Roleid: String
})

module.exports = mongoose.model('djrolesguild', Schema);
