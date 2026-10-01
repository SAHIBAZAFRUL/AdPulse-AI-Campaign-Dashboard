import { useRef, useState } from "react";
import {
  FiUser,
  FiBell,
  FiDatabase,
  FiServer,
  FiGlobe,
  FiUpload,
  FiSave,
} from "react-icons/fi";
import Switch from "react-switch";
import toast from "react-hot-toast";
import { useProfile } from "../context/ProfileContext";

function Settings() {
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState({
    name: "Sahiba",
    email: "admin@deltax.com",
    phone: "+91 9876543210",
    company: "DeltaX Marketing",
    role: "Product Engineer",
  });

  // Shared across the app via ProfileContext (persisted to
  // localStorage) — this is what fixes the photo reverting when
  // you navigated away and came back.
  const { avatar: avatarPreview, setAvatar: setAvatarPreview } = useProfile();

  const [notifications, setNotifications] = useState({
    email: true,
    reports: true,
    ai: true,
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result);
      toast.success("Photo updated — saved in this browser");
    };
    reader.readAsDataURL(file);
  };

  const saveProfile = () => {
    // Heads up: this only shows a success toast, it doesn't call
    // an API — there's no backend endpoint here to persist profile
    // edits, so changes won't survive a page refresh yet.
    toast.success("Profile Updated Successfully!");
  };

  return (
    <div className="space-y-8">
      {/* No page heading here — Navbar already shows "Settings"
          and its subtitle for this route. */}

      {/* Profile Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Card */}
        <div className="bg-[#17223B] rounded-3xl border border-[#2A3B57] p-8 shadow-lg flex flex-col items-center">
          <img
            src={avatarPreview}
            alt="Profile"
            className="w-40 h-40 rounded-full border-4 border-cyan-500 shadow-lg object-cover"
          />

          <h2 className="text-2xl font-bold mt-6">{profile.name}</h2>
          <p className="text-slate-400">{profile.role}</p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />

          <button
            onClick={handlePhotoClick}
            className="mt-8 bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl flex items-center gap-2 transition"
          >
            <FiUpload />
            Upload Photo
          </button>
        </div>

        {/* Right Card */}
        <div className="lg:col-span-2 bg-[#17223B] rounded-3xl border border-[#2A3B57] shadow-lg p-8">
          <div className="flex items-center gap-3 mb-8">
            <FiUser className="text-cyan-400" size={26} />
            <h2 className="text-xl font-semibold">Profile Information</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-slate-400 text-sm">Name</label>
              <input
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full mt-2 bg-[#0F172A] rounded-xl p-4 border border-[#2A3B57] focus:border-cyan-500 outline-none transition"
              />
            </div>

            <div>
              <label className="text-slate-400 text-sm">Email</label>
              <input
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full mt-2 bg-[#0F172A] rounded-xl p-4 border border-[#2A3B57] focus:border-cyan-500 outline-none transition"
              />
            </div>

            <div>
              <label className="text-slate-400 text-sm">Phone</label>
              <input
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full mt-2 bg-[#0F172A] rounded-xl p-4 border border-[#2A3B57] focus:border-cyan-500 outline-none transition"
              />
            </div>

            <div>
              <label className="text-slate-400 text-sm">Company</label>
              <input
                name="company"
                value={profile.company}
                onChange={handleChange}
                className="w-full mt-2 bg-[#0F172A] rounded-xl p-4 border border-[#2A3B57] focus:border-cyan-500 outline-none transition"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-slate-400 text-sm">Role</label>
              <input
                name="role"
                value={profile.role}
                onChange={handleChange}
                className="w-full mt-2 bg-[#0F172A] rounded-xl p-4 border border-[#2A3B57] focus:border-cyan-500 outline-none transition"
              />
            </div>
          </div>

          <button
            onClick={saveProfile}
            className="mt-8 w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.01] transition rounded-xl py-4 font-semibold flex justify-center items-center gap-2"
          >
            <FiSave />
            Save Changes
          </button>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-[#17223B] rounded-3xl border border-[#2A3B57] shadow-lg p-8">
        <div className="flex items-center gap-3 mb-8">
          <FiBell className="text-yellow-400" size={24} />
          <h2 className="text-xl font-semibold">Notification Preferences</h2>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-sm">Email Notifications</h3>
              <p className="text-slate-400 text-sm">Receive updates by email</p>
            </div>
            <Switch
              checked={notifications.email}
              onChange={(value) =>
                setNotifications({ ...notifications, email: value })
              }
              onColor="#06b6d4"
            />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-sm">Weekly Reports</h3>
              <p className="text-slate-400 text-sm">Weekly analytics summary</p>
            </div>
            <Switch
              checked={notifications.reports}
              onChange={(value) =>
                setNotifications({ ...notifications, reports: value })
              }
              onColor="#06b6d4"
            />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-sm">AI Recommendations</h3>
              <p className="text-slate-400 text-sm">
                Personalized campaign suggestions
              </p>
            </div>
            <Switch
              checked={notifications.ai}
              onChange={(value) =>
                setNotifications({ ...notifications, ai: value })
              }
              onColor="#06b6d4"
            />
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: <FiServer />, title: "Backend", value: "Online", color: "text-emerald-400" },
          { icon: <FiDatabase />, title: "MongoDB", value: "Connected", color: "text-emerald-400" },
          { icon: <FiGlobe />, title: "API", value: "Healthy", color: "text-emerald-400" },
          { icon: "🚀", title: "Version", value: "v1.0.0", color: "text-cyan-400" },
        ].map((card) => (
          <div
            key={card.title}
            className="bg-[#17223B] rounded-2xl border border-[#2A3B57] p-6 hover:border-cyan-500 transition"
          >
            <div className="text-2xl mb-4">{card.icon}</div>
            <p className="text-slate-400 text-sm">{card.title}</p>
            <h2 className={`text-lg font-bold mt-2 ${card.color}`}>
              {card.value}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Settings;