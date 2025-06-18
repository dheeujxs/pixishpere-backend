const express = require("express");
const router = express.Router();
const {
  getPendingPartners,
  updatePartnerStatus,
  getAdminStats
} = require("../controllers/adminController");
const { protect, authorizeRoles } = require("../middlewares/auth");

router.get("/pending-partners", protect, authorizeRoles("admin"), getPendingPartners);

router.patch("/partner/:id/status", protect, authorizeRoles("admin"), updatePartnerStatus);

router.get("/stats", protect, authorizeRoles("admin"), getAdminStats);
module.exports = router;
