const Campaign = require("../models/Campaign");

// Get all campaigns
const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create campaign
const createCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.create(req.body);
    res.status(201).json(campaign);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update campaign
const updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!campaign) {
      return res.status(404).json({
        message: "Campaign not found",
      });
    }

    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete campaign
const deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);

    if (!campaign) {
      return res.status(404).json({
        message: "Campaign not found",
      });
    }

    res.status(200).json({
      message: "Campaign Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getCampaigns,
  createCampaign,
  updateCampaign,
  deleteCampaign,
};