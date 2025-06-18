const Inquiry = require("../models/Inquiry");
const PartnerProfile = require("../models/PartnerProfile");

exports.submitInquiry = async (req, res) => {
  try {
    const { category, date, budget, city, referenceImage } = req.body;

    const matchedPartners = await PartnerProfile.find({
      city,
      services: { $in: [category] },
      status: "verified"
    }).select("_id");

    const assignedPartnerIds = matchedPartners.map(p => p._id);

    const inquiry = await Inquiry.create({
      user: req.user.id,
      category,
      date,
      budget,
      city,
      referenceImage,
      assignedPartners: assignedPartnerIds
    });

    res.status(201).json({ message: "Inquiry submitted", inquiry });
  } catch (err) {
    console.error("Submit Inquiry Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getPartnerInquiries = async (req, res) => {
  try {
    console.log("Logged in user id:", req.user.id);

    const partner = await PartnerProfile.findOne({ user: req.user.id });
    if (!partner) {
      console.log("No partner profile found");
      return res.status(404).json({ error: "Partner profile not found" });
    }

    console.log("Partner ID:", partner._id);

    const inquiries = await Inquiry.find({
      assignedPartners: partner._id
    }).populate("user", "name email");

    console.log("Inquiries for partner:", inquiries);

    res.status(200).json({ inquiries });
  } catch (err) {
    console.error("Fetch Partner Inquiries Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};


exports.updateInquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["new", "responded", "booked", "closed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const inquiry = await Inquiry.findByIdAndUpdate(id, { status }, { new: true });

    if (!inquiry) return res.status(404).json({ error: "Inquiry not found" });

    res.status(200).json({ message: "Status updated", inquiry });
  } catch (err) {
    console.error("Update Inquiry Status Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
