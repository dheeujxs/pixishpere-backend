



const express = require("express");
const router = express.Router();
const { createPartnerProfile , getPartnerProfile ,updatePartnerProfile } = require("../controllers/partnerController");
const {authorizeRoles , protect} = require("../middlewares/auth");

/**
 * @swagger
 * /api/partner/register:
 *   post:
 *     summary: Register a new partner
 *     tags:
 *       - Partners
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Partner created successfully
 *       400:
 *         description: Bad request
 */
router.post(
  "/profile",
  protect,                          
  authorizeRoles("partner"),        
  createPartnerProfile              
);

router.get("/profile", protect, authorizeRoles("partner"), getPartnerProfile);

router.put("/profile", protect, authorizeRoles("partner"), updatePartnerProfile);

module.exports = router;
