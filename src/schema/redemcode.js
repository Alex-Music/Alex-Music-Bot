const { Schema, model } = require("mongoose");

const PremiumSchema = new Schema({
  Usage: Number,
  Code: String,
  Expiry: Number
});

module.exports = model("redeemCodes", PremiumSchema);