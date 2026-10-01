import { useEffect, useState } from "react";
import API from "../services/api";

function AIRecommendations() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const res = await API.get("/campaigns");
      const campaigns = res.data;

      if (campaigns.length === 0) {
        setRecommendations(["No campaign data available."]);
        return;
      }

      const recommendationsList = [];

      // Highest Click Campaign
      const topCampaign = campaigns.reduce((max, item) =>
        item.clicks > max.clicks ? item : max
      );

      recommendationsList.push(
        `🚀 Increase the budget for "${topCampaign.campaignName}". It has the highest engagement with ${topCampaign.clicks.toLocaleString()} clicks.`
      );

      // Highest Conversion Rate
      const bestConversion = campaigns.reduce((max, item) => {
        const current =
          item.clicks > 0
            ? item.conversions / item.clicks
            : 0;

        const previous =
          max.clicks > 0
            ? max.conversions / max.clicks
            : 0;

        return current > previous ? item : max;
      });

      recommendationsList.push(
        `🎯 "${bestConversion.campaignName}" has the best conversion rate. Consider scaling this campaign.`
      );

      // Low Conversion Campaigns
      campaigns.forEach((campaign) => {
        const rate =
          campaign.clicks > 0
            ? (campaign.conversions / campaign.clicks) * 100
            : 0;

        if (rate < 2) {
          recommendationsList.push(
            `⚠ Review "${campaign.campaignName}". Conversion rate is only ${rate.toFixed(
              1
            )}%.`
          );
        }
      });

      setRecommendations(recommendationsList);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-800">

      <h2 className="text-2xl font-bold mb-5">
        💡 AI Recommendations
      </h2>

      <div className="space-y-4">

        {recommendations.map((item, index) => (
          <div
            key={index}
            className="bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-green-500 transition"
          >
            {item}
          </div>
        ))}

      </div>

    </div>
  );
}

export default AIRecommendations;