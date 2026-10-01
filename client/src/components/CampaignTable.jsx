import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../services/api";
import {
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiInbox,
  FiChevronUp,
  FiChevronDown,
} from "react-icons/fi";
import CampaignDetailModal from "./CampaignDetailModal";

const COLUMNS = [
  { key: "campaignName", label: "Campaign", align: "left" },
  { key: "platform", label: "Platform", align: "left" },
  { key: "budget", label: "Budget", align: "right" },
  { key: "clicks", label: "Clicks", align: "right" },
  { key: "conversions", label: "Conversions", align: "right" },
];

function CampaignTable({ onEdit, refresh, startDate, endDate }) {
  const [searchParams] = useSearchParams();
  const [campaigns, setCampaigns] = useState([]);
  // Pre-fills from ?search=... when arriving via the navbar search
  // (e.g. clicking a result there navigates to /campaigns?search=X).
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [platformFilter, setPlatformFilter] = useState("All");
  const [loaded, setLoaded] = useState(false);
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [detailCampaign, setDetailCampaign] = useState(null);

  // Re-syncs whenever the URL's ?search= param changes — not just
  // on first mount. Without this, searching again from the navbar
  // while already on this page updated the URL but never actually
  // updated the visible search box or filtered results, since this
  // component doesn't remount for a same-route navigation.
  useEffect(() => {
    const urlSearch = searchParams.get("search");
    if (urlSearch !== null) {
      setSearch(urlSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    fetchCampaigns();
  }, [refresh]);

  const fetchCampaigns = async () => {
    try {
      const res = await API.get("/campaigns");
      setCampaigns(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoaded(true);
    }
  };

  const handleEdit = (campaign) => onEdit(campaign);

  const deleteCampaign = async (id) => {
    try {
      await API.delete(`/campaigns/${id}`);
      fetchCampaigns();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const platformOptions = useMemo(() => {
    const unique = [...new Set(campaigns.map((c) => c.platform))].filter(
      Boolean
    );
    return ["All", ...unique];
  }, [campaigns]);

  const filteredCampaigns = campaigns.filter((campaign) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      campaign.campaignName?.toLowerCase().includes(searchText) ||
      campaign.platform?.toLowerCase().includes(searchText) ||
      campaign.budget?.toString().includes(searchText) ||
      campaign.clicks?.toString().includes(searchText) ||
      campaign.conversions?.toString().includes(searchText) ||
      (campaign.impressions ?? "").toString().includes(searchText);

    const matchesPlatform =
      platformFilter === "All" || campaign.platform === platformFilter;

    const campaignDate = new Date(campaign.startDate);
    const matchesDate =
      (!startDate || campaignDate >= new Date(startDate)) &&
      (!endDate || campaignDate <= new Date(endDate));

    return matchesSearch && matchesPlatform && matchesDate;
  });

  const sortedCampaigns = useMemo(() => {
    if (!sortKey) return filteredCampaigns;
    const sorted = [...filteredCampaigns].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === "string") {
        return sortDir === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return sortDir === "asc" ? aVal - bVal : bVal - aVal;
    });
    return sorted;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredCampaigns, sortKey, sortDir]);

  return (
    <div className="bg-[#17223B] border border-[#2A3B57] rounded-2xl p-7 shadow-lg">
      <h2 className="text-base font-semibold mb-6">Campaign Performance</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 flex items-center gap-3 bg-[#0F172A] border border-[#2A3B57] rounded-xl px-4 py-3">
          <FiSearch className="text-slate-400 shrink-0" size={18} />
          <input
            type="text"
            placeholder="Search by campaign, platform, budget, clicks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-white placeholder:text-slate-500 text-sm"
          />
        </div>

        <select
          value={platformFilter}
          onChange={(e) => setPlatformFilter(e.target.value)}
          className="bg-[#0F172A] border border-[#2A3B57] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-cyan-500 transition"
        >
          {platformOptions.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto -mx-2">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="text-left text-slate-400 border-b border-[#2A3B57]">
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className={`font-medium py-3 px-2 select-none cursor-pointer hover:text-white transition ${
                    col.align === "right" ? "text-right" : "text-left"
                  }`}
                  onClick={() => handleSort(col.key)}
                >
                  <span
                    className={`inline-flex items-center gap-1 ${
                      col.align === "right" ? "flex-row-reverse" : ""
                    }`}
                  >
                    {col.label}
                    {sortKey === col.key ? (
                      sortDir === "asc" ? (
                        <FiChevronUp size={13} className="text-cyan-400" />
                      ) : (
                        <FiChevronDown size={13} className="text-cyan-400" />
                      )
                    ) : (
                      <FiChevronUp size={13} className="text-slate-600" />
                    )}
                  </span>
                </th>
              ))}
              <th className="font-medium py-3 px-2 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {sortedCampaigns.length > 0 ? (
              sortedCampaigns.map((campaign) => (
                <tr
                  key={campaign._id}
                  className="border-b border-[#2A3B57] last:border-0 hover:bg-[#0F172A] transition"
                >
                  <td className="py-4 px-2">
                    <button
                      onClick={() => setDetailCampaign(campaign)}
                      className="font-medium text-left hover:text-cyan-400 transition truncate max-w-[160px] block"
                    >
                      {campaign.campaignName}
                    </button>
                  </td>
                  <td className="px-2 text-slate-300">
                    {campaign.platform}
                  </td>
                  <td className="px-2 text-right text-slate-300">
                    ₹{campaign.budget?.toLocaleString()}
                  </td>
                  <td className="px-2 text-right text-slate-300">
                    {campaign.clicks?.toLocaleString()}
                  </td>
                  <td className="px-2 text-right text-slate-300">
                    {campaign.conversions?.toLocaleString()}
                  </td>
                  <td className="px-2">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleEdit(campaign)}
                        aria-label={`Edit ${campaign.campaignName}`}
                        className="w-9 h-9 rounded-lg bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition flex items-center justify-center"
                      >
                        <FiEdit2 size={15} />
                      </button>

                      <button
                        onClick={() => deleteCampaign(campaign._id)}
                        aria-label={`Delete ${campaign.campaignName}`}
                        className="w-9 h-9 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition flex items-center justify-center"
                      >
                        <FiTrash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-16">
                  <div className="flex flex-col items-center gap-3 text-slate-500">
                    <FiInbox size={28} />
                    <p className="text-sm">
                      {loaded
                        ? "No campaigns match your filters."
                        : "Loading campaigns..."}
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {detailCampaign && (
        <CampaignDetailModal
          campaign={detailCampaign}
          allCampaigns={campaigns}
          onClose={() => setDetailCampaign(null)}
        />
      )}
    </div>
  );
}

export default CampaignTable;