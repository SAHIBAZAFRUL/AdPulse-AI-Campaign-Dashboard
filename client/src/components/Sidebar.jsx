import {
  FiHome,
  FiLayers,
  FiBarChart2,
  FiUsers,
  FiSettings,
  FiX,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/", icon: <FiHome size={20} /> },
  { name: "Campaigns", path: "/campaigns", icon: <FiLayers size={20} /> },
  { name: "Analytics", path: "/analytics", icon: <FiBarChart2 size={20} /> },
  { name: "Customers", path: "/customers", icon: <FiUsers size={20} /> },
  { name: "Settings", path: "/settings", icon: <FiSettings size={20} /> },
];

export default function Sidebar({ isOpen = false, onClose }) {
  return (
    <>
      {/* Backdrop — mobile only, closes the drawer on tap outside */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
        fixed
        top-0
        left-0
        z-50
        w-72
        h-screen
        bg-[#17223B]
        border-r
        border-[#2A3B57]
        flex
        flex-col
        transition-transform
        duration-300
        ease-in-out
        lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="px-7 py-7 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-teal-400">
              AdPulse
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              AI marketing dashboard
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close menu"
            className="lg:hidden w-9 h-9 rounded-lg bg-[#0F172A] border border-[#2A3B57] flex items-center justify-center"
          >
            <FiX size={16} />
          </button>
        </div>

        {/* Menu */}
        <nav className="mt-6 flex-1 px-4 overflow-y-auto">
          {menu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-4
                px-4
                py-3.5
                rounded-xl
                mb-2
                transition-all
                duration-200
                ${
                  isActive
                    ? "bg-cyan-500 text-white shadow-lg"
                    : "text-slate-400 hover:bg-[#172338] hover:text-white"
                }
                `
              }
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-5 border-t border-[#2A3B57]">
          <div className="bg-[#172338] rounded-xl p-4">
            <p className="text-xs text-slate-500">Workspace</p>
            <h3 className="font-semibold mt-1">AdPulse Team</h3>
          </div>
        </div>
      </aside>
    </>
  );
}