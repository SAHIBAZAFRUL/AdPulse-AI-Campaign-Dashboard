// import { useEffect, useState } from "react";
// import API from "../services/api";

// export default function RecentActivity() {
//   const [campaigns, setCampaigns] = useState([]);

//   useEffect(() => {
//     fetchCampaigns();
//   }, []);

//   const fetchCampaigns = async () => {
//     try {
//       const res = await API.get("/campaigns");

//       const latest = res.data
//         .sort(
//           (a, b) =>
//             new Date(b.createdAt) - new Date(a.createdAt)
//         )
//         .slice(0, 5);

//       setCampaigns(latest);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div
//       className="
//       bg-[#17223B]
//       border
//       border-[#2A3B57]
//       rounded-3xl
//       px-8
//       py-8
//       shadow-lg
//       h-full
//       "
//     >
//       <div className="mb-8">
//         <h2 className="text-2xl font-semibold">
//           Recent Activity
//         </h2>

//         <p className="text-slate-400 mt-2">
//           Latest campaign updates
//         </p>
//       </div>

//       <div className="space-y-6">
//         {campaigns.map((campaign, index) => (
//           <div
//             key={campaign._id}
//             className={`
//               flex
//               justify-between
//               items-center
//               pb-5
//               ${
//                 index !== campaigns.length - 1
//                   ? "border-b border-[#2A3B57]"
//                   : ""
//               }
//             `}
//           >
//             <div>
//               <h3 className="text-lg font-semibold">
//                 {campaign.campaignName}
//               </h3>

//               <p className="text-slate-400 mt-2">
//                 {campaign.platform}
//               </p>
//             </div>

//             <span className="text-cyan-400 font-semibold text-lg">
//               ₹{campaign.budget.toLocaleString()}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { FiActivity } from "react-icons/fi";

export default function RecentActivity() {
  const [campaigns, setCampaigns] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      const res = await API.get("/campaigns");

      const latest = res.data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      setCampaigns(latest);
    } catch (err) {
      console.log(err);
    } finally {
      setLoaded(true);
    }
  };

  const timeAgo = (dateStr) => {
    const diffMs = Date.now() - new Date(dateStr).getTime();

    const hours = Math.floor(diffMs / (1000 * 60 * 60));

    if (hours < 1) return "Just now";

    if (hours < 24)
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;

    const days = Math.floor(hours / 24);

    return `${days} day${days > 1 ? "s" : ""} ago`;
  };

  return (
    <div
      className="
      bg-[#16213A]
      border
      border-[#253652]
      rounded-3xl
      px-8
      py-8
      shadow-lg
      h-full
      "
    >
      {/* Heading */}

      <div className="flex justify-between items-center mb-8">

        <div className="flex items-center gap-4">

          <div
            className="
            w-11
            h-11
            rounded-2xl
            bg-cyan-500/10
            text-cyan-400
            flex
            items-center
            justify-center
            "
          >
            <FiActivity size={18} />
          </div>

          <div>

            <h2 className="text-2xl font-semibold tracking-tight">
              Recent Activity
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              Latest campaign updates
            </p>

          </div>

        </div>

        <Link
          to="/campaigns"
          className="
          text-sm
          font-medium
          text-cyan-400
          hover:text-cyan-300
          transition
          "
        >
          View all
        </Link>

      </div>

      {/* Empty */}

      {loaded && campaigns.length === 0 ? (
        <div className="text-center text-slate-500 py-10">
          No campaigns available.
        </div>
      ) : (
        <div className="space-y-1">

          {campaigns.map((campaign, index) => (
            <div
              key={campaign._id}
              className={`
              flex
              justify-between
              items-center
              py-5
              ${
                index !== campaigns.length - 1
                  ? "border-b border-[#253652]"
                  : ""
              }
              `}
            >
              <div className="flex items-center gap-4">

                <div className="w-3 h-3 rounded-full bg-cyan-400" />

                <div>

                  <h3 className="font-semibold text-white">
                    {campaign.campaignName}
                  </h3>

                  <p className="text-sm text-slate-400 mt-1">
                    {campaign.platform} • {timeAgo(campaign.createdAt)}
                  </p>

                </div>

              </div>

              <div className="text-right">

                <h3 className="font-semibold text-cyan-400">
                  ₹{campaign.budget.toLocaleString()}
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  {campaign.clicks.toLocaleString()} clicks
                </p>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}