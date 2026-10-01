import { useEffect, useState } from "react";
import API from "../services/api";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

// Renamed in purpose (not filename, to avoid touching imports
// elsewhere) from a "monthly trend" to a direct campaign
// comparison. The old version grouped real data by month, which
// was honest but visually broken with only 3 campaigns — 9 months
// legitimately have zero data, making the chart look empty/fake.
// Comparing the actual campaigns side by side uses the same real
// numbers without implying a time series that doesn't exist yet.
function MonthlyTrendChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await API.get("/campaigns");
      setData(
        res.data.map((c) => ({
          name: c.campaignName,
          clicks: c.clicks,
          conversions: c.conversions,
        }))
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-[#17223B] rounded-2xl p-7 shadow-lg border border-[#2A3B57]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-base font-semibold">Campaign Comparison</h2>
          <p className="text-slate-400 text-sm mt-1">
            Clicks vs conversions across all campaigns
          </p>
        </div>
        <span className="text-sm text-cyan-400">Live</span>
      </div>

      <ResponsiveContainer width="100%" height={340}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
          barGap={6}
        >
          <CartesianGrid stroke="#2A3B57" strokeDasharray="4 4" vertical={false} />
          <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 12 }} />
          <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
          <Tooltip
            cursor={{ fill: "rgba(148, 163, 184, 0.08)" }}
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid #2A3B57",
              borderRadius: "12px",
              color: "#fff",
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="clicks" fill="#06b6d4" radius={[8, 8, 0, 0]} barSize={28} />
          <Bar dataKey="conversions" fill="#22c55e" radius={[8, 8, 0, 0]} barSize={28} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyTrendChart;