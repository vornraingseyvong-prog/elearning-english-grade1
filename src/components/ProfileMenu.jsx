import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function ProfileMenu() {
  const { currentProfile, profiles, switchProfile } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!currentProfile) return null;

  return (
    <div className="fixed top-4 right-4 z-40" ref={menuRef}>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow-lg border-2 border-purple-200"
      >
        <span className="text-2xl">{currentProfile.avatar}</span>
        <span className="font-bold text-purple-700 max-w-[80px] truncate">
          {currentProfile.name}
        </span>
        <span className="text-purple-400">👇</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 bg-white rounded-2xl shadow-xl border-2 border-purple-200 overflow-hidden min-w-[180px]"
          >
            <div className="p-2 bg-purple-50">
              <p className="text-sm text-purple-500 font-bold">✨ Stars: {currentProfile.totalStars}</p>
            </div>

            {profiles.length > 1 && (
              <>
                <div className="px-3 py-2 text-xs text-gray-400 font-bold uppercase">Switch Profile</div>
                {profiles.filter(p => p.id !== currentProfile.id).map(profile => (
                  <button
                    key={profile.id}
                    onClick={() => { switchProfile(profile.id); setOpen(false); }}
                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-purple-50 transition-colors"
                  >
                    <span className="text-xl">{profile.avatar}</span>
                    <span className="font-medium">{profile.name}</span>
                  </button>
                ))}
              </>
            )}

            <div className="border-t border-gray-100">
              <Link
                to="/profiles"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-purple-50 transition-colors"
              >
                👥 Manage Profiles
              </Link>
              <Link
                to="/stars"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-purple-50 transition-colors"
              >
                ⭐ My Stars
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}