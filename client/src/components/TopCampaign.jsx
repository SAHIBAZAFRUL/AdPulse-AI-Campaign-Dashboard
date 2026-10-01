import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { FiTrendingUp } from "react-icons/fi";

export default function TopCampaign() {
  const [campaigns, setCampaigns] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await API.get("/campaigns");

      const top = [...res.data]
        .sort((a, b) => b.conversions - a.conversions)
        .slice(0, 5);

      setCampaigns(top);
    } catch (err) {
      console.log(err);
    } finally {
      setLoaded(true);
    }
  };

  // CTR here uses clicks/impressions when impressions are tracked
  // (matches the same definition used for the CTR stat card);
  // falls back to conversions/clicks only if impressions aren't
  // available, so the number stays meaningful either way.
  const ctrFor = (c) => {
    if (c.impressions > 0) return ((c.clicks / c.impressions) * 100).toFixed(2);
    if (c.clicks > 0) return ((c.conversions / c.clicks) * 100).toFixed(2);
    return "0.00";
  };

  return (
    <div className="bg-[#17223B] rounded-2xl border border-[#2A3B57] p-7 shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400 shrink-0">
            <FiTrendingUp size={16} />
          </div>
          <div>
            <h2 className="text-base font-semibold">
              Top Performing Campaigns
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Ranked by conversions
            </p>
          </div>
        </div>

        <Link
          to="/campaigns"
          className="text-xs font-medium text-cyan-400 hover:text-cyan-300 transition shrink-0"
        >
          View All
        </Link>
      </div>

      {loaded && campaigns.length === 0 ? (
        <div className="text-slate-500 text-sm py-8 text-center">
          No campaigns available.
        </div>
      ) : (
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-sm min-w-[420px]">
            <thead>
              <tr className="text-left text-slate-400 border-b border-[#2A3B57]">
                <th className="font-medium py-2 px-2">Campaign</th>
                <th className="font-medium py-2 px-2 text-right">Clicks</th>
                <th className="font-medium py-2 px-2 text-right">
                  Conversions
                </th>
                <th className="font-medium py-2 px-2 text-right">CTR</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr
                  key={c._id}
                  className="border-b border-emerald-500/20 last:border-0 bg-emerald-500/10"
                >
                  <td className="py-3 px-2 font-medium truncate max-w-[140px]">
                    <span className="text-emerald-400">
                      {c.campaignName}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-right text-slate-300">
                    {c.clicks.toLocaleString()}
                  </td>
                  <td className="py-3 px-2 text-right text-slate-300">
                    {c.conversions.toLocaleString()}
                  </td>
                  <td className="py-3 px-2 text-right text-cyan-400 font-medium">
                    {ctrFor(c)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}