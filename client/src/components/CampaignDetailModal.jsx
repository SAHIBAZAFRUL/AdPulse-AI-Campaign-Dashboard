import { FiX, FiDollarSign, FiMousePointer, FiTarget, FiEye } from "react-icons/fi";

// Shows the full record for one campaign plus metrics computed
// honestly from real fields (CTR, conversion rate) and how it
// compares to the average of all other campaigns. No fabricated
// "trend over time" chart here — the data model only stores one
// snapshot per campaign, so a time-series chart would have
// nothing real to plot.
export default function CampaignDetailModal({ campaign, allCampaigns, onClose }) {
  if (!campaign) return null;

  const ctr =
    campaign.impressions > 0
      ? ((campaign.clicks / campaign.impressions) * 100).toFixed(2)
      : null;

  const conversionRate =
    campaign.clicks > 0
      ? ((campaign.conversions / campaign.clicks) * 100).toFixed(2)
      : null;

  const avg = (key) => {
    const values = allCampaigns.map((c) => c[key] || 0);
    if (!values.length) return 0;
    return values.reduce((a, b) => a + b, 0) / values.length;
  };

  const avgBudget = avg("budget");
  const avgClicks = avg("clicks");
  const avgConversions = avg("conversions");

  const compareRow = (label, icon, value, average, tint) => {
    const pctOfAvg = average > 0 ? (value / average) * 100 : 0;
    const barWidth = Math.min(pctOfAvg, 150); // cap the bar visually
    return (
      <div className="bg-[#0F172A] border border-[#2A3B57] rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-8 h-8 rounded-lg ${tint} flex items-center justify-center shrink-0`}>
            {icon}
          </div>
          <p className="text-slate-400 text-sm">{label}</p>
        </div>
        <p className="text-xl font-bold mb-2">
          {label === "Budget" ? "₹" : ""}
          {value.toLocaleString()}
        </p>
        <div className="h-1.5 rounded-full bg-[#17223B] overflow-hidden">
          <div
            className="h-full bg-cyan-400 rounded-full"
            style={{ width: `${barWidth}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-2">
          {average > 0
            ? `${pctOfAvg.toFixed(0)}% of your campaign average (${Math.round(
                average
              ).toLocaleString()})`
            : "No comparison data yet"}
        </p>
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#17223B] border border-[#2A3B57] rounded-2xl p-7 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-semibold">{campaign.campaignName}</h2>
            <p className="text-slate-400 text-sm mt-1">{campaign.platform}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 rounded-lg bg-[#0F172A] border border-[#2A3B57] flex items-center justify-center shrink-0"
          >
            <FiX size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {compareRow(
            "Budget",
            <FiDollarSign size={15} className="text-emerald-400" />,
            campaign.budget || 0,
            avgBudget,
            "bg-emerald-500/10"
          )}
          {compareRow(
            "Clicks",
            <FiMousePointer size={15} className="text-cyan-400" />,
            campaign.clicks || 0,
            avgClicks,
            "bg-cyan-500/10"
          )}
          {compareRow(
            "Conversions",
            <FiTarget size={15} className="text-violet-400" />,
            campaign.conversions || 0,
            avgConversions,
            "bg-violet-500/10"
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#0F172A] border border-[#2A3B57] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <FiEye size={15} className="text-slate-400" />
              <p className="text-slate-400 text-sm">Impressions</p>
            </div>
            <p className="text-lg font-semibold">
              {campaign.impressions?.toLocaleString() ?? "Not tracked"}
            </p>
          </div>

          <div className="bg-[#0F172A] border border-[#2A3B57] rounded-xl p-4">
            <p className="text-slate-400 text-sm mb-2">CTR</p>
            <p className="text-lg font-semibold">
              {ctr !== null ? `${ctr}%` : "Needs impressions data"}
            </p>
          </div>

          <div className="bg-[#0F172A] border border-[#2A3B57] rounded-xl p-4 col-span-2">
            <p className="text-slate-400 text-sm mb-2">Conversion Rate</p>
            <p className="text-lg font-semibold">
              {conversionRate !== null
                ? `${conversionRate}% of clicks converted`
                : "No clicks recorded yet"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}