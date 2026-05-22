import { createContext, useContext, useState, useEffect } from 'react';

// Default avatars - fun, child-friendly emojis
export const AVATARS = [
  '🦁', '🐰', '🐼', '🦊', '🐸', '🐵', '🦄', '🐳',
  '🦋', '🐢', '🦜', '🐶', '🐱', '🦉', '🐲', '🦢',
];

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [profiles, setProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  // Load profiles from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('student-profiles');
    if (stored) {
      setProfiles(JSON.parse(stored));
    }
    const current = localStorage.getItem('current-profile');
    if (current) {
      setCurrentProfile(JSON.parse(current));
    } else if (!stored || JSON.parse(stored).length === 0) {
      // First time user - show login modal
      setShowLogin(true);
    }
  }, []);

  // Save profiles whenever they change
  useEffect(() => {
    localStorage.setItem('student-profiles', JSON.stringify(profiles));
  }, [profiles]);

  // Save current profile whenever it changes
  useEffect(() => {
    if (currentProfile) {
      localStorage.setItem('current-profile', JSON.stringify(currentProfile));
    }
  }, [currentProfile]);

  const createProfile = (name, avatar) => {
    const newProfile = {
      id: Date.now().toString(),
      name,
      avatar,
      totalStars: 0,
      createdAt: new Date().toISOString(),
    };
    setProfiles((prev) => [...prev, newProfile]);
    setCurrentProfile(newProfile);
    setShowLogin(false);
    return newProfile;
  };

  const switchProfile = (profileId) => {
    const profile = profiles.find((p) => p.id === profileId);
    if (profile) {
      setCurrentProfile(profile);
    }
  };

  const deleteProfile = (profileId) => {
    setProfiles((prev) => prev.filter((p) => p.id !== profileId));
    if (currentProfile?.id === profileId) {
      const remaining = profiles.filter((p) => p.id !== profileId);
      setCurrentProfile(remaining.length > 0 ? remaining[0] : null);
      if (remaining.length === 0) {
        setShowLogin(true); // Show login if no profiles left
      }
    }
  };

  const updateProfileStars = (stars) => {
    if (!currentProfile) return;
    const updated = { ...currentProfile, totalStars: stars };
    setCurrentProfile(updated);
    setProfiles((prev) =>
      prev.map((p) => (p.id === currentProfile.id ? updated : p))
    );
  };

  const updateProfileName = (name) => {
    if (!currentProfile) return;
    const updated = { ...currentProfile, name };
    setCurrentProfile(updated);
    setProfiles((prev) =>
      prev.map((p) => (p.id === currentProfile.id ? updated : p))
    );
  };

  return (
    <AuthContext.Provider
      value={{
        profiles,
        currentProfile,
        showLogin,
        setShowLogin,
        createProfile,
        switchProfile,
        deleteProfile,
        updateProfileStars,
        updateProfileName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}