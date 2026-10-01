import { useEffect, useState } from "react";
import API from "../services/api";
import { FiAward, FiDollarSign, FiStar, FiZap } from "react-icons/fi";

import MonthlyTrendChart from "../components/MonthlyTrendChart";
import AIRecommendations from "../components/AIRecommendations";

function Analytics() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await API.get("/campaigns");
      setCampaigns(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const totalBudget = campaigns.reduce((sum, item) => sum + item.budget, 0);
  const totalClicks = campaigns.reduce((sum, item) => sum + item.clicks, 0);
  const totalConversions = campaigns.reduce(
    (sum, item) => sum + item.conversions,
    0
  );
  const totalImpressions = campaigns.reduce(
    (sum, item) => sum + item.impressions,
    0
  );

  const ctr =
    totalImpressions > 0
      ? ((totalClicks / totalImpressions) * 100).toFixed(2)
      : "0.00";

  const conversionRate =
    totalClicks > 0
      ? ((totalConversions / totalClicks) * 100).toFixed(2)
      : "0.00";

  const highestBudgetCampaign =
    campaigns.length > 0
      ? campaigns.reduce((max, c) => (c.budget > max.budget ? c : max))
      : null;

  const topCampaign =
    campaigns.length > 0
      ? campaigns.reduce((max, c) => (c.clicks > max.clicks ? c : max))
      : null;

  // Per-platform totals — computed here already, but the old page
  // only ever showed the single "best" one and threw the rest of
  // this data away. The table below uses all of it.
  const platformStats = {};
  campaigns.forEach((c) => {
    if (!platformStats[c.platform]) {
      platformStats[c.platform] = { clicks: 0, conversions: 0, impressions: 0 };
    }
    platformStats[c.platform].clicks += c.clicks;
    platformStats[c.platform].conversions += c.conversions;
    platformStats[c.platform].impressions += c.impressions || 0;
  });

  const platformRows = Object.entries(platformStats).sort(
    (a, b) => b[1].clicks - a[1].clicks
  );

  const bestPlatform = platformRows[0] || null;

  const statCard = (title, value, icon, tint, gradientBar) => (
    <div className="relative bg-[#17223B] border border-[#2A3B57] rounded-2xl p-7 shadow-lg overflow-hidden">
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${gradientBar}`} />
      <div className="flex justify-between items-start">
        <div className="min-w-0">
          <p className="text-slate-400 text-sm truncate">{title}</p>
          <h2 className="text-xl font-bold mt-3 truncate">{value}</h2>
        </div>
        <div className={`${tint} w-12 h-12 rounded-xl flex items-center justify-center shrink-0`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* No page heading here — Navbar already shows "Analytics"
          with the gradient title and subtitle for this route. */}

      {/* Overall stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCard(
          "Budget",
          `₹${totalBudget.toLocaleString()}`,
          <FiDollarSign size={20} className="text-cyan-400" />,
          "bg-cyan-500/10",
          "from-cyan-400 to-blue-500"
        )}
        {statCard(
          "Impressions",
          totalImpressions.toLocaleString(),
          <FiZap size={20} className="text-blue-400" />,
          "bg-blue-500/10",
          "from-blue-400 to-indigo-500"
        )}
        {statCard(
          "CTR",
          `${ctr}%`,
          <FiStar size={20} className="text-violet-400" />,
          "bg-violet-500/10",
          "from-violet-400 to-purple-500"
        )}
        {statCard(
          "Conversion Rate",
          `${conversionRate}%`,
          <FiAward size={20} className="text-emerald-400" />,
          "bg-emerald-500/10",
          "from-emerald-400 to-teal-500"
        )}
      </div>

      {/* Executive KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#17223B] border border-[#2A3B57] rounded-2xl p-7 shadow-lg hover:border-cyan-500 transition">
          <p className="text-slate-400 text-sm mb-2">🏆 Top Campaign</p>
          <h2 className="text-lg font-bold truncate">
            {topCampaign ? topCampaign.campaignName : "No Data"}
          </h2>
          <p className="text-cyan-400 mt-3 text-sm">
            {topCampaign ? `${topCampaign.clicks.toLocaleString()} Clicks` : ""}
          </p>
        </div>

        <div className="bg-[#17223B] border border-[#2A3B57] rounded-2xl p-7 shadow-lg hover:border-emerald-500 transition">
          <p className="text-slate-400 text-sm mb-2">💰 Highest Budget</p>
          <h2 className="text-lg font-bold truncate">
            {highestBudgetCampaign ? highestBudgetCampaign.campaignName : "No Data"}
          </h2>
          <p className="text-emerald-400 mt-3 text-sm">
            {highestBudgetCampaign
              ? `₹${highestBudgetCampaign.budget.toLocaleString()}`
              : ""}
          </p>
        </div>

        <div className="bg-[#17223B] border border-[#2A3B57] rounded-2xl p-7 shadow-lg hover:border-yellow-500 transition">
          <p className="text-slate-400 text-sm mb-2">⭐ Best Platform</p>
          <h2 className="text-lg font-bold truncate">
            {bestPlatform ? bestPlatform[0] : "No Data"}
          </h2>
          <p className="text-yellow-400 mt-3 text-sm">
            {bestPlatform ? `${bestPlatform[1].clicks.toLocaleString()} Clicks` : ""}
          </p>
        </div>
      </div>

      {/* Campaign comparison (real per-campaign data, not a fake monthly trend) */}
      <div className="mb-8">
        <MonthlyTrendChart />
      </div>

      {/* Platform breakdown — new, not duplicated from Dashboard */}
      <div className="bg-[#17223B] border border-[#2A3B57] rounded-2xl p-7 shadow-lg mb-8">
        <h2 className="text-base font-semibold mb-6">Platform Breakdown</h2>
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-sm min-w-[480px]">
            <thead>
              <tr className="text-left text-slate-400 border-b border-[#2A3B57]">
                <th className="font-medium py-2 px-2">Platform</th>
                <th className="font-medium py-2 px-2 text-right">Clicks</th>
                <th className="font-medium py-2 px-2 text-right">Conversions</th>
                <th className="font-medium py-2 px-2 text-right">CTR</th>
              </tr>
            </thead>
            <tbody>
              {platformRows.length > 0 ? (
                platformRows.map(([platform, stats]) => (
                  <tr key={platform} className="border-b border-[#2A3B57] last:border-0">
                    <td className="py-3 px-2 font-medium">{platform}</td>
                    <td className="py-3 px-2 text-right text-slate-300">
                      {stats.clicks.toLocaleString()}
                    </td>
                    <td className="py-3 px-2 text-right text-slate-300">
                      {stats.conversions.toLocaleString()}
                    </td>
                    <td className="py-3 px-2 text-right text-cyan-400 font-medium">
                      {stats.impressions > 0
                        ? `${((stats.clicks / stats.impressions) * 100).toFixed(2)}%`
                        : "—"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-slate-500">
                    No data yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="mb-8">
        <AIRecommendations />
      </div>
    </>
  );
}

export default Analytics;