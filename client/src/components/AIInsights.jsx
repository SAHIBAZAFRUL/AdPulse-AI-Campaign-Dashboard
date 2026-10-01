import { useEffect, useState } from "react";
import API from "../services/api";
import { FiAward, FiTrendingUp, FiTarget, FiRefreshCw } from "react-icons/fi";
import toast from "react-hot-toast";

// Same soft tint system used everywhere else on the dashboard.
const TINTS = {
  cyan: "bg-cyan-500/10 text-cyan-400",
  blue: "bg-blue-500/10 text-blue-400",
  purple: "bg-violet-500/10 text-violet-400",
};

export default function AIInsights() {
  const [insights, setInsights] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    try {
      const res = await API.get("/campaigns");
      const campaigns = res.data;

      if (!campaigns.length) {
        setInsights([]);
        setLoaded(true);
        if (isManualRefresh) toast("No campaign data to refresh yet");
        return;
      }

      const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);

      const bestClicks = campaigns.reduce((a, b) =>
        a.clicks > b.clicks ? a : b
      );

      const bestConversion = campaigns.reduce((a, b) =>
        a.conversions > b.conversions ? a : b
      );

      // These are genuine aggregates from your data — not
      // AI-generated recommendations. Framed that way so the
      // labels don't overclaim what's actually happening here.
      setInsights([
        {
          title: "Top campaign by clicks",
          description: `${bestClicks.campaignName} generated ${bestClicks.clicks.toLocaleString()} clicks — your highest of any campaign.`,
          icon: <FiAward size={18} />,
          tint: "cyan",
        },
        {
          title: "Best converting campaign",
          description: `${bestConversion.campaignName} leads with ${bestConversion.conversions.toLocaleString()} conversions.`,
          icon: <FiTarget size={18} />,
          tint: "purple",
        },
        {
          title: "Total reach",
          description: `${totalClicks.toLocaleString()} clicks across all ${campaigns.length} campaigns combined.`,
          icon: <FiTrendingUp size={18} />,
          tint: "blue",
        },
      ]);
      setLoaded(true);
      if (isManualRefresh) toast.success("Insights refreshed");
    } catch (err) {
      console.log(err);
      setLoaded(true);
      if (isManualRefresh) toast.error("Couldn't refresh insights");
    } finally {
      if (isManualRefresh) setRefreshing(false);
    }
  };

  return (
    <div
      className="
      bg-[#17223B]
      border
      border-[#2A3B57]
      rounded-2xl
      p-7
      shadow-lg"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-base font-semibold">Insights</h2>
          <p className="text-slate-400 text-sm mt-1">
            Summary of your campaign performance
          </p>
        </div>

        <button
          onClick={() => loadInsights(true)}
          disabled={refreshing}
          className="
          flex
          items-center
          gap-2
          text-xs
          font-medium
          text-cyan-400
          bg-cyan-500/10
          hover:bg-cyan-500/20
          disabled:opacity-60
          disabled:cursor-not-allowed
          transition
          px-3
          py-2
          rounded-lg
          shrink-0"
        >
          <FiRefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {loaded && insights.length === 0 ? (
        <div className="text-slate-500 text-sm py-8 text-center">
          No campaign data yet — insights will appear once you add a campaign.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {insights.map((item, index) => (
            <div
              key={index}
              className="
              flex
              items-start
              gap-4
              bg-[#0F172A]
              border
              border-[#2A3B57]
              rounded-xl
              p-4"
            >
              <div
                className={`
                ${TINTS[item.tint]}
                w-10
                h-10
                rounded-lg
                flex
                items-center
                justify-center
                shrink-0`}
              >
                {item.icon}
              </div>

              <div className="min-w-0">
                <h3 className="font-medium text-sm">{item.title}</h3>
                <p className="text-slate-400 text-sm mt-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}