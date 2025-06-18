const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  budget: { type: Number, required: true },
  city: { type: String, required: true },
  referenceImage: { type: String },
  status: {
    type: String,
    enum: ["new", "responded", "booked", "closed"],
    default: "new"
  },
  assignedPartners: [{ type: mongoose.Schema.Types.ObjectId, ref: "PartnerProfile" }]
}, { timestamps: true });

module.exports = mongoose.model("Inquiry", inquirySchema);
