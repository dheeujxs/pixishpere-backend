const mongoose = require("mongoose");

const portfolioItemSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  description: String,
  index: {
    type: Number,
    default: 0
  }
});

const portfolioSchema = new mongoose.Schema({
  partner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PartnerProfile",
    required: true,
    unique: true
  },
  items: [portfolioItemSchema]
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
