import { useEffect, useRef, useState } from "react";
import { FiSearch, FiSettings, FiLogOut, FiMenu } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";
import NotificationsDropdown from "./NotificationsDropdown";
import { useProfile } from "../context/ProfileContext";

const PAGE_INFO = {
  "/": {
    title: "Dashboard",
    subtitle: "Welcome back, Sahiba 👋",
    titleClassName: "text-cyan-400",
  },
  "/campaigns": {
    title: "Campaigns",
    subtitle: "Manage your advertising campaigns",
  },
  "/analytics": {
    title: "Analytics",
    subtitle: "Real-time campaign insights",
    gradient: true,
  },
  "/customers": {
    title: "Customers",
    subtitle: "Customer Management Dashboard",
  },
  "/settings": {
    title: "Settings",
    subtitle: "Manage your account and application preferences.",
    gradient: true,
  },
};

export default function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const { avatar } = useProfile();

  const [query, setQuery] = useState("");
  const [allCampaigns, setAllCampaigns] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const { title, subtitle, gradient, titleClassName } =
    PAGE_INFO[location.pathname] || PAGE_INFO["/"];

  useEffect(() => {
    API.get("/campaigns")
      .then((res) => setAllCampaigns(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const results = query
    ? allCampaigns.filter(
        (c) =>
          c.campaignName?.toLowerCase().includes(query.toLowerCase()) ||
          c.platform?.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const goToCampaigns = (term) => {
    navigate(`/campaigns?search=${encodeURIComponent(term)}`);
    setShowResults(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      goToCampaigns(query.trim());
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <header
      className="
      min-h-20
      px-0
      py-4
      flex
      flex-wrap
      items-center
      justify-between
      gap-4"
    >
      {/* Left: hamburger (mobile only) + title */}
      <div className="flex items-center gap-4 min-w-0">
        <button
          onClick={onMenuClick}
          aria-label="Open menu"
          className="
          lg:hidden
          w-11
          h-11
          rounded-xl
          bg-[#0F172A]
          border
          border-[#2A3B57]
          flex
          items-center
          justify-center
          shrink-0"
        >
          <FiMenu size={18} />
        </button>

        <div className="min-w-0">
          <h1
            className={`text-lg sm:text-xl font-semibold truncate ${
              gradient
                ? "bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent"
                : titleClassName || ""
            }`}
          >
            {title}
          </h1>
          <p className="text-slate-400 text-sm mt-1 truncate">{subtitle}</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 sm:gap-5 flex-wrap justify-end">
        {/* Search — hidden below lg to avoid crowding on tablet/mobile */}
        <div className="hidden lg:block relative" ref={searchRef}>
          <div
            className="
            flex
            items-center
            gap-3
            bg-[#0F172A]
            border
            border-[#2A3B57]
            rounded-xl
            px-4
            py-3
            w-64
            xl:w-80"
          >
            <FiSearch className="text-slate-400 shrink-0" size={18} />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
              onKeyDown={handleKeyDown}
              className="
              bg-transparent
              outline-none
              flex-1
              text-white
              placeholder:text-slate-500"
            />
          </div>

          {showResults && query && (
            <div className="absolute right-0 mt-2 w-full bg-[#17223B] border border-[#2A3B57] rounded-xl shadow-lg z-50 max-h-72 overflow-y-auto">
              {results.length === 0 ? (
                <p className="text-slate-500 text-sm text-center py-6">
                  No campaigns match "{query}"
                </p>
              ) : (
                <>
                  {results.slice(0, 6).map((c) => (
                    <button
                      key={c._id}
                      onClick={() => goToCampaigns(c.campaignName)}
                      className="w-full text-left px-4 py-3 hover:bg-[#0F172A] transition flex justify-between items-center gap-2"
                    >
                      <span className="truncate text-sm font-medium">
                        {c.campaignName}
                      </span>
                      <span className="text-xs text-slate-500 shrink-0">
                        {c.platform}
                      </span>
                    </button>
                  ))}
                  <button
                    onClick={() => goToCampaigns(query)}
                    className="w-full text-center text-xs text-cyan-400 hover:text-cyan-300 transition py-2 border-t border-[#2A3B57]"
                  >
                    See all results in Campaigns →
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        <NotificationsDropdown />

        <button
          onClick={() => navigate("/settings")}
          aria-label="Settings"
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
          shrink-0"
        >
          <FiSettings size={18} />
        </button>

        {/* User — name/role hide below sm, avatar always shows */}
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={avatar}
            alt="Sahiba's profile"
            className="w-11 h-11 rounded-full border-2 border-cyan-400 shrink-0 object-cover"
          />
          <div className="hidden sm:block min-w-0">
            <h3 className="font-semibold truncate">Sahiba</h3>
            <p className="text-xs text-slate-400 truncate">Product Engineer</p>
          </div>
        </div>

        <button
          onClick={logout}
          aria-label="Logout"
          className="
          bg-gradient-to-r
          from-red-600
          to-rose-600
          hover:from-red-500
          hover:to-rose-500
          shadow-lg
          shadow-red-600/20
          transition
          rounded-xl
          px-3
          sm:px-4
          py-3
          flex
          items-center
          gap-2
          shrink-0"
        >
          <FiLogOut />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}