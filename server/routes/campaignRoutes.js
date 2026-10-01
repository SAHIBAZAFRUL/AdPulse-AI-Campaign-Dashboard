const express = require("express");

const router = express.Router();

const {
  getCampaigns,
  createCampaign,
  updateCampaign,
  deleteCampaign,
} = require("../controllers/campaignController");

// Get all campaigns
router.get("/", getCampaigns);

// Create campaign
router.post("/", createCampaign);

// Update campaign
router.put("/:id", updateCampaign);

// Delete campaign
router.delete("/:id", deleteCampaign);

module.exports = router;