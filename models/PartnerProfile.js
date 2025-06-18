
const mongoose = require("mongoose");

const partnerProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  services: [String],
  city: String,
  aadharNumber: String,
  portfolio: [String], // image URLs
  status: {
    type: String,
    enum: ["pending", "verified", "rejected"],
    default: "pending"
  },
  adminComment: String
}, { timestamps: true });

module.exports = mongoose.model("PartnerProfile", partnerProfileSchema);
