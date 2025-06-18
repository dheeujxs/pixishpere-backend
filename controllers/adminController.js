const PartnerProfile = require("../models/PartnerProfile");

exports.getPendingPartners = async (req, res) => {
  try {
    const pendingPartners = await PartnerProfile.find({ status: "pending" }).populate("user", "name email");
    res.status(200).json({ partners: pendingPartners });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.updatePartnerStatus = async (req, res) => {
  try {
    const { status, adminComment } = req.body;
    const { id } = req.params;

    console.log("Request body:", req.body);
    console.log("Partner ID:", id);

    if (!["verified", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const updated = await PartnerProfile.findByIdAndUpdate(
      id,
      { status, adminComment },
      { new: true }
    ).populate("user", "name email");

    if (!updated) return res.status(404).json({ error: "Profile not found" });

    res.status(200).json({ message: `Partner ${status}`, profile: updated });
  } catch (err) {
    console.error("Update error:", err);  // <-- ADD THIS
    res.status(500).json({ error: "Server error" });
  }
};


exports.getAdminStats = async (req, res) => {
  try {
    const totalClients = await User.countDocuments({ role: "client" });
    const totalPartners = await User.countDocuments({ role: "partner" });
    const pendingVerifications = await Partner.countDocuments({ status: "pending" });
    const totalInquiries = await Inquiry.countDocuments();

    res.json({
      totalClients,
      totalPartners,
      pendingVerifications,
      totalInquiries,
    });
  } catch (err) {
    console.error("Admin stats error:", err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};