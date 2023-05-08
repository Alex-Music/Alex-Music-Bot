const m = require('mongoose')

module.exports = m.model('premiumUser', new m.Schema({

    UserID: String,
    Expire: Number,
    Permanent: Boolean

}))