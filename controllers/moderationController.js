const Review = require("../models/Review");
const Category = require("../models/category");
const Location = require("../models/location");

// --------- Review ---------
exports.getReviews = async (req, res) => {
  const reviews = await Review.find();
  res.json(reviews);
};

exports.deleteReview = async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ message: "Review deleted" });
};

exports.editReview = async (req, res) => {
  const updated = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// --------- Category ---------
exports.createCategory = async (req, res) => {
  const category = await Category.create(req.body);
  res.json(category);
};

exports.getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

exports.updateCategory = async (req, res) => {
  const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteCategory = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Category deleted" });
};

// --------- Location ---------
exports.createLocation = async (req, res) => {
  const location = await Location.create(req.body);
  res.json(location);
};

exports.getLocations = async (req, res) => {
  const locations = await Location.find();
  res.json(locations);
};

exports.updateLocation = async (req, res) => {
  const updated = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteLocation = async (req, res) => {
  await Location.findByIdAndDelete(req.params.id);
  res.json({ message: "Location deleted" });
};
