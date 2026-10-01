// import { useEffect, useState } from "react";
// import API from "../services/api";
// import {
//   FiDollarSign,
//   FiMousePointer,
//   FiTarget,
//   FiTrendingUp,
// } from "react-icons/fi";
// import StatCard from "./StatCard";

// export default function DashboardStats() {
//   const [campaigns, setCampaigns] = useState([]);

//   useEffect(() => {
//     fetchCampaigns();
//   }, []);

//   const fetchCampaigns = async () => {
//     try {
//       const res = await API.get("/campaigns");
//       setCampaigns(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);

//   const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);

//   const totalConversions = campaigns.reduce(
//     (sum, c) => sum + c.conversions,
//     0
//   );

//   const totalImpressions = campaigns.reduce(
//     (sum, c) => sum + c.impressions,
//     0
//   );

//   const ctr =
//     totalImpressions > 0
//       ? ((totalClicks / totalImpressions) * 100).toFixed(2)
//       : 0;

//   return (
//     <section
//       className="
//       grid
//       grid-cols-1
//       sm:grid-cols-2
//       xl:grid-cols-4
//       gap-8
//       mb-2
//       "
//     >
//       <StatCard
//         title="Total Budget"
//         value={`₹${totalBudget.toLocaleString()}`}
//         icon={<FiDollarSign size={24} />}
//         color="cyan"
//       />

//       <StatCard
//         title="Total Clicks"
//         value={totalClicks.toLocaleString()}
//         icon={<FiMousePointer size={24} />}
//         color="blue"
//       />

//       <StatCard
//         title="Conversions"
//         value={totalConversions.toLocaleString()}
//         icon={<FiTarget size={24} />}
//         color="green"
//       />

//       <StatCard
//         title="CTR"
//         value={`${ctr}%`}
//         icon={<FiTrendingUp size={24} />}
//         color="purple"
//       />
//     </section>
//   );
// }

import { useEffect, useState } from "react";
import API from "../services/api";
import {
  FiDollarSign,
  FiMousePointer,
  FiTarget,
  FiTrendingUp,
} from "react-icons/fi";
import StatCard from "./StatCard";

const sumBy = (list, key) => list.reduce((sum, c) => sum + (c[key] || 0), 0);

// Real week-over-week % change: splits campaigns into "created in
// the last 7 days" vs "created the 7 days before that" using their
// actual createdAt timestamps, then compares totals for a metric
// between the two buckets. If there's no data in the prior week
// (e.g. a brand-new project), returns null instead of a fake number
// so the badge is simply omitted rather than showing 0%/Infinity%.
function weekOverWeekChange(campaigns, key) {
  const now = Date.now();
  const oneWeek = 7 * 24 * 60 * 60 * 1000;

  const thisWeek = campaigns.filter(
    (c) => now - new Date(c.createdAt).getTime() <= oneWeek
  );
  const lastWeek = campaigns.filter((c) => {
    const age = now - new Date(c.createdAt).getTime();
    return age > oneWeek && age <= oneWeek * 2;
  });

  const thisTotal = sumBy(thisWeek, key);
  const lastTotal = sumBy(lastWeek, key);

  if (lastTotal === 0) return null;
  return ((thisTotal - lastTotal) / lastTotal) * 100;
}

export default function DashboardStats() {
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

  const totalBudget = sumBy(campaigns, "budget");
  const totalClicks = sumBy(campaigns, "clicks");
  const totalConversions = sumBy(campaigns, "conversions");
  const totalImpressions = sumBy(campaigns, "impressions");

  const ctr =
    totalImpressions > 0
      ? ((totalClicks / totalImpressions) * 100).toFixed(2)
      : 0;

  // Each of these is `null` until there's enough historical data
  // to compute a genuine comparison — StatCard hides the badge
  // entirely when that happens, rather than showing a placeholder.
  const budgetChange = weekOverWeekChange(campaigns, "budget");
  const clicksChange = weekOverWeekChange(campaigns, "clicks");
  const conversionsChange = weekOverWeekChange(campaigns, "conversions");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Budget"
        value={`₹${totalBudget.toLocaleString()}`}
        icon={<FiDollarSign size={24} />}
        color="cyan"
        change={budgetChange}
      />

      <StatCard
        title="Total Clicks"
        value={totalClicks.toLocaleString()}
        icon={<FiMousePointer size={24} />}
        color="blue"
        change={clicksChange}
      />

      <StatCard
        title="Conversions"
        value={totalConversions.toLocaleString()}
        icon={<FiTarget size={24} />}
        color="green"
        change={conversionsChange}
      />

      <StatCard
        title="CTR"
        value={`${ctr}%`}
        icon={<FiTrendingUp size={24} />}
        color="purple"
        // CTR is a ratio, not a summable total, so week-over-week
        // change for it isn't computed the same way — left off
        // rather than approximated.
      />
    </div>
  );
}