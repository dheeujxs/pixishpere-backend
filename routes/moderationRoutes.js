const express = require("express");
const router = express.Router();
const {
  getReviews, editReview, deleteReview,
  createCategory, getCategories, updateCategory, deleteCategory,
  createLocation, getLocations, updateLocation, deleteLocation
} = require("../controllers/moderationController");

// -------- Reviews --------
router.get("/reviews", getReviews);
router.put("/reviews/:id", editReview);
router.delete("/reviews/:id", deleteReview);

// -------- Categories --------
router.post("/categories", createCategory);
router.get("/categories", getCategories);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

// -------- Locations --------
router.post("/locations", createLocation);
router.get("/locations", getLocations);
router.put("/locations/:id", updateLocation);
router.delete("/locations/:id", deleteLocation);

module.exports = router;
