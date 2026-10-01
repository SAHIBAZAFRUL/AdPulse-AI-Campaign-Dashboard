import { useEffect, useRef, useState } from "react";
import API from "../services/api";
import { FiBell, FiAlertTriangle, FiPlusCircle, FiAward } from "react-icons/fi";

// Notifications are computed from real campaign data — no
// fabricated event log ("budget approved", "campaign paused")
// since the backend doesn't actually track those events. What's
// shown here is genuinely derivable: recently added campaigns,
// and campaigns getting clicks with zero conversions (a real,
// useful signal worth surfacing).
export default function NotificationsDropdown() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    loadNotifications();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const loadNotifications = async () => {
    try {
      const res = await API.get("/campaigns");
      const campaigns = res.data;
      const list = [];

      const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      campaigns
        .filter((c) => new Date(c.createdAt).getTime() >= oneWeekAgo)
        .forEach((c) =>
          list.push({
            id: `new-${c._id}`,
            icon: <FiPlusCircle className="text-cyan-400" size={16} />,
            text: `New campaign added: ${c.campaignName}`,
          })
        );

      campaigns
        .filter((c) => c.clicks > 0 && c.conversions === 0)
        .forEach((c) =>
          list.push({
            id: `zero-${c._id}`,
            icon: <FiAlertTriangle className="text-yellow-400" size={16} />,
            text: `${c.campaignName} has ${c.clicks.toLocaleString()} clicks but 0 conversions`,
          })
        );

      if (campaigns.length > 0) {
        const top = campaigns.reduce((a, b) =>
          a.conversions > b.conversions ? a : b
        );
        list.push({
          id: `top-${top._id}`,
          icon: <FiAward className="text-violet-400" size={16} />,
          text: `${top.campaignName} is your best-converting campaign`,
        });
      }

      setItems(list);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Notifications"
        className="
        w-11
        h-11
        rounded-xl
        bg-[#0F172A]
        border
        border-[#2A3B57]
        hover:border-cyan-500
        transition
        flex
        items-center
        justify-center
        shrink-0
        relative"
      >
        <FiBell size={18} />
        {items.length > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[10px] font-bold flex items-center justify-center">
            {items.length > 9 ? "9+" : items.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-[#17223B] border border-[#2A3B57] rounded-xl shadow-lg z-50 p-2">
          {items.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-6">
              Nothing to show yet.
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#0F172A] transition"
              >
                <div className="mt-0.5 shrink-0">{item.icon}</div>
                <p className="text-sm text-slate-200">{item.text}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}