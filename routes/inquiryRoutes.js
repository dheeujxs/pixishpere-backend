const express = require("express");
const router = express.Router();
const { protect, authorizeRoles } = require("../middlewares/auth");
const {
  submitInquiry,
  getPartnerInquiries,
  updateInquiryStatus
} = require("../controllers/inquriyController");

router.post("/", protect, authorizeRoles("client"), submitInquiry);
router.get("/partner", protect, authorizeRoles("partner"), getPartnerInquiries);
router.patch("/:id/status", protect, authorizeRoles("admin", "partner"), updateInquiryStatus);

module.exports = router;
