import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { ProfileProvider } from "../context/ProfileContext";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProfileProvider>
      <div className="min-h-screen bg-[#0B1220] text-white">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <div className="lg:ml-72 min-h-screen">
          {/* Navbar */}
          <header className="px-6 lg:px-8 pt-6">
            <Navbar
              onMenuClick={() => setSidebarOpen(true)}
            />
          </header>

          {/* Dashboard */}
          <main className="px-6 lg:px-8 py-8">
            <div className="max-w-[1700px] mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </ProfileProvider>
  );
}