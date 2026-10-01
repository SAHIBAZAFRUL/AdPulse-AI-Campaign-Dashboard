import { createContext, useContext, useState } from "react";

const ProfileContext = createContext(null);

const DEFAULT_AVATAR = "https://i.pravatar.cc/250?img=45";
const STORAGE_KEY = "adpulse_profile_avatar";

// Shared across the whole app so the uploaded photo survives page
// navigation (Settings unmounting) and browser reloads (localStorage),
// instead of living only in Settings.jsx's own local state — which
// is why it kept reverting the moment you left that page.
export function ProfileProvider({ children }) {
  const [avatar, setAvatarState] = useState(
    () => localStorage.getItem(STORAGE_KEY) || DEFAULT_AVATAR
  );

  const setAvatar = (dataUrl) => {
    setAvatarState(dataUrl);
    try {
      localStorage.setItem(STORAGE_KEY, dataUrl);
    } catch (err) {
      // localStorage can throw if the image is too large for its
      // quota (~5MB) — the preview still works for this session,
      // it just won't survive a refresh in that case.
      console.log("Could not persist avatar to localStorage:", err);
    }
  };

  return (
    <ProfileContext.Provider value={{ avatar, setAvatar }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) {
    throw new Error("useProfile must be used inside a ProfileProvider");
  }
  return ctx;
}