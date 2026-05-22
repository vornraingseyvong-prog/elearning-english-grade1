import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import LoginModal from '../components/LoginModal';
import AvatarPicker from '../components/AvatarPicker';

export default function Profiles() {
  const { profiles, currentProfile, createProfile, switchProfile, deleteProfile } = useAuth();
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAvatar, setNewAvatar] = useState(null);
  const navigate = useNavigate();

  const handleCreate = () => {
    if (newName.trim() && newAvatar) {
      createProfile(newName.trim(), newAvatar);
      setShowCreate(false);
      setNewName('');
      setNewAvatar(null);
    }
  };

  const handleDelete = (profileId) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      deleteProfile(profileId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">👥</div>
          <h1 className="text-3xl font-bold text-purple-700">Who's Learning Today?</h1>
          <p className="text-purple-500 mt-1">Tap a profile to switch or add a new one</p>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {profiles.map((profile) => (
            <motion.div
              key={profile.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`
                bg-white rounded-3xl p-4 shadow-lg border-4 cursor-pointer transition-all
                ${currentProfile?.id === profile.id ? 'border-purple-400' : 'border-transparent'}
              `}
            >
              <div
                onClick={() => { switchProfile(profile.id); navigate('/'); }}
                className="text-center"
              >
                <div className="text-5xl mb-2">{profile.avatar}</div>
                <p className="font-bold text-lg text-gray-700 truncate">{profile.name}</p>
                <p className="text-sm text-yellow-500">⭐ {profile.totalStars} stars</p>
              </div>
              {profiles.length > 1 && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => { e.stopPropagation(); handleDelete(profile.id); }}
                  className="mt-3 w-full py-2 bg-red-100 text-red-500 rounded-xl font-bold text-sm hover:bg-red-200 transition-colors"
                >
                  🗑️ Delete
                </motion.button>
              )}
            </motion.div>
          ))}

          {/* Add New Profile Card */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowCreate(true)}
            className="bg-white rounded-3xl p-4 shadow-lg border-4 border-dashed border-purple-300 flex flex-col items-center justify-center min-h-[180px]"
          >
            <div className="text-4xl mb-2">➕</div>
            <p className="font-bold text-purple-500">Add New Profile</p>
          </motion.button>
        </div>

        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="w-full py-4 bg-purple-500 text-white rounded-2xl font-bold text-lg shadow-lg"
        >
          🏠 Back to Home
        </motion.button>
      </div>

      {/* Create Profile Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl"
          >
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">🎨</div>
              <h2 className="text-2xl font-bold text-purple-600">Create New Profile</h2>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2 font-bold">Pick an Avatar:</p>
              <AvatarPicker selected={newAvatar} onSelect={setNewAvatar} size="sm" />
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2 font-bold">Enter Name:</p>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Your name..."
                className="w-full px-4 py-3 text-xl border-4 border-purple-200 rounded-2xl focus:border-purple-400 focus:outline-none text-center"
                maxLength={20}
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
              />
            </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setShowCreate(false); setNewName(''); setNewAvatar(null); }}
                className="flex-1 py-3 bg-gray-200 text-gray-600 rounded-2xl font-bold"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCreate}
                disabled={!newName.trim() || !newAvatar}
                className={`flex-1 py-3 rounded-2xl font-bold text-white transition-all
                  ${newName.trim() && newAvatar ? 'bg-green-500' : 'bg-gray-300'}
                `}
              >
                Create ✅
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}