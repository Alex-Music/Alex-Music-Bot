const m = require('mongoose')

module.exports = m.model('premiumGuild', new m.Schema({

    GuildID: String,
    Expire: Number,
    Permanent: Boolean

}))