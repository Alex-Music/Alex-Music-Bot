const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    Soundcloudtracklink: String,
    Spotifytracklink: String,
    Spotifytracktitle: String,
    Artistlink: String,
    Artistname: String,
})

module.exports = mongoose.model('track-info', Schema);
