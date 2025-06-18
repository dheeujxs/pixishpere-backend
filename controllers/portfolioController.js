const Portfolio = require("../models/Portfolio");
const PartnerProfile = require("../models/PartnerProfile");

// Mock image URL generator
const generateMockImageUrl = () => `https://dummyimage.com/600x400?text=Image+${Date.now()}`;

// Add new portfolio item
exports.addPortfolioItem = async (req, res) => {
  try {
    const partner = await PartnerProfile.findOne({ user: req.user.id });
    if (!partner) return res.status(404).json({ error: "Partner profile not found" });

    const { description, index } = req.body;
    const imageUrl = generateMockImageUrl();

    let portfolio = await Portfolio.findOne({ partner: partner._id });

    const newItem = { imageUrl, description, index };

    if (!portfolio) {
      portfolio = await Portfolio.create({ partner: partner._id, items: [newItem] });
    } else {
      portfolio.items.push(newItem);
      await portfolio.save();
    }

    res.status(201).json({ message: "Portfolio item added", portfolio });
  } catch (err) {
    console.error("Add Portfolio Item Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Edit portfolio item
exports.editPortfolioItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { description, index } = req.body;

    const partner = await PartnerProfile.findOne({ user: req.user.id });
    const portfolio = await Portfolio.findOne({ partner: partner._id });

    const item = portfolio.items.id(itemId);
    if (!item) return res.status(404).json({ error: "Item not found" });

    if (description !== undefined) item.description = description;
    if (index !== undefined) item.index = index;

    await portfolio.save();
    res.status(200).json({ message: "Portfolio item updated", item });
  } catch (err) {
    console.error("Edit Portfolio Item Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete portfolio item
exports.deletePortfolioItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const partner = await PartnerProfile.findOne({ user: req.user.id });
    const portfolio = await Portfolio.findOne({ partner: partner._id });

    const item = portfolio.items.id(itemId);
    if (!item) return res.status(404).json({ error: "Item not found" });

    item.remove();
    await portfolio.save();

    res.status(200).json({ message: "Portfolio item deleted" });
  } catch (err) {
    console.error("Delete Portfolio Item Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all portfolio items (sorted by index)
exports.getPortfolio = async (req, res) => {
  try {
    const partner = await PartnerProfile.findOne({ user: req.user.id });
    const portfolio = await Portfolio.findOne({ partner: partner._id });

    const items = portfolio ? portfolio.items.sort((a, b) => a.index - b.index) : [];

    res.status(200).json({ items });
  } catch (err) {
    console.error("Get Portfolio Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};


exports.reorderPortfolio = async (req, res) => {
  try {
    const items = req.body; // array of { _id, index }

    const updatePromises = items.map(item =>
      PortfolioItem.updateOne(
        { _id: item._id, partner: req.user.id }, // secure to owner
        { index: item.index }
      )
    );

    await Promise.all(updatePromises);

    res.status(200).json({ message: "Portfolio reordered successfully" });
  } catch (err) {
    console.error("Reorder Portfolio Error:", err);
    res.status(500).json({ error: "Server error during reorder" });
  }
};


