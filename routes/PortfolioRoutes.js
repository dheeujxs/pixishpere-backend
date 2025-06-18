const express = require("express");
const router = express.Router();
const {
  addPortfolioItem,
  editPortfolioItem,
  deletePortfolioItem,
  getPortfolio,
  reorderPortfolio
} = require("../controllers/portfolioController");
const { protect, authorizeRoles } = require("../middlewares/auth");

router.use(protect, authorizeRoles("partner"));

router.get("/", getPortfolio);
router.post("/", addPortfolioItem);
router.patch("/:itemId", editPortfolioItem);
router.delete("/:itemId", deletePortfolioItem);
router.post("/reorder", protect, authorizeRoles("partner"), reorderPortfolio);

module.exports = router;
