const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    campaignName: {
      type: String,
      required: true,
    },

    platform: {
      type: String,
      required: true,
    },

    budget: {
      type: Number,
      required: true,
    },

    impressions: {
      type: Number,
      required: true,
    },

    clicks: {
      type: Number,
      required: true,
    },

    conversions: {
      type: Number,
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Campaign", campaignSchema);
