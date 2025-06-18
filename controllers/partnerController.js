const Partner = require("../models/PartnerProfile");
const PartnerProfile = require("../models/PartnerProfile");

exports.createPartnerProfile = async (req, res) => {
  try {
    const { services, city, aadharNumber, portfolio } = req.body;

    const existing = await PartnerProfile.findOne({ user: req.user.id });
    if (existing) return res.status(400).json({ error: "Profile already exists" });

    const profile = await PartnerProfile.create({
      user: req.user.id,
      services,
      city,
      aadharNumber,
      portfolio
    });

    res.status(201).json({ message: "Profile created", profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getPartnerProfile = async (req, res) => {
  try {
    const profile = await Partner.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.status(200).json({ profile });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }

};

exports.updatePartnerProfile = async (req, res) => {
  try {
    const { services, city, aadharNumber, portfolio } = req.body;

    const profile = await PartnerProfile.findOneAndUpdate(
      { user: req.user.id },
      { services, city, aadharNumber, portfolio },
      { new: true }
    );

    if (!profile) return res.status(404).json({ error: "Profile not found" });

    res.status(200).json({ message: "Profile updated", profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
