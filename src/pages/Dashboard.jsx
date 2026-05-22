import { motion } from 'framer-motion';

export default function Dashboard() {
  // Sample data - in real app would come from localStorage/API
  const stars = 24;
  const lettersLearned = 18;
  const wordsLearned = 42;
  const badges = [
    { id: 1, name: 'Star Collector', emoji: '⭐', earned: true },
    { id: 2, name: 'Letter Master', emoji: '🔤', earned: true },
    { id: 3, name: 'Word Wizard', emoji: '📚', earned: true },
    { id: 4, name: 'Super Speller', emoji: '🏆', earned: false },
    { id: 5, name: 'Reading Pro', emoji: '🎓', earned: false },
  ];

  const weeklyData = [
    { day: 'Mon', count: 3 },
    { day: 'Tue', count: 5 },
    { day: 'Wed', count: 2 },
    { day: 'Thu', count: 7 },
    { day: 'Fri', count: 4 },
    { day: 'Sat', count: 6 },
    { day: 'Sun', count: 3 },
  ];
  const maxCount = Math.max(...weeklyData.map(d => d.count));

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-purple-600 mb-2">
          📊 My Dashboard 📊
        </h1>
        <p className="text-xl text-gray-600">See how awesome you're doing!</p>
      </motion.div>

      {/* Stars Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-3xl p-6 shadow-xl border-4 border-white mb-6 max-w-md mx-auto"
      >
        <div className="flex items-center justify-center gap-4">
          <span className="text-6xl">⭐</span>
          <div className="text-center">
            <p className="text-5xl font-bold text-yellow-900">{stars}</p>
            <p className="text-xl text-yellow-800 font-medium">Stars Earned!</p>
          </div>
          <span className="text-6xl">⭐</span>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
        {/* Letters Learned */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-4 shadow-lg border-4 border-blue-200 text-center"
        >
          <span className="text-4xl mb-2 block">🔤</span>
          <p className="text-3xl font-bold text-blue-600">{lettersLearned}</p>
          <p className="text-sm text-gray-600 font-medium">Letters Learned</p>
        </motion.div>

        {/* Words Learned */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-4 shadow-lg border-4 border-green-200 text-center"
        >
          <span className="text-4xl mb-2 block">📝</span>
          <p className="text-3xl font-bold text-green-600">{wordsLearned}</p>
          <p className="text-sm text-gray-600 font-medium">Words Learned</p>
        </motion.div>
      </div>

      {/* Weekly Activity Bar Chart - CSS Only */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-3xl p-6 shadow-xl border-4 border-purple-200 max-w-md mx-auto mb-6"
      >
        <h2 className="text-2xl font-bold text-purple-600 text-center mb-6">
          🗓️ This Week's Activity
        </h2>
        <div className="flex items-end justify-between gap-2 h-48 px-2">
          {weeklyData.map((item, index) => (
            <motion.div
              key={item.day}
              initial={{ height: 0 }}
              animate={{ height: '100%' }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              className="flex-1 flex flex-col items-center"
            >
              <div className="relative w-full flex-1 flex items-end">
                <div
                  className="w-full rounded-t-lg"
                  style={{
                    height: `${(item.count / maxCount) * 100}%`,
                    background: `linear-gradient(to top, #9B59B6, #E056FD)`,
                    minHeight: item.count > 0 ? '8px' : '0',
                  }}
                >
                  <span className="absolute top-[-24px] left-1/2 transform -translate-x-1/2 text-sm font-bold text-purple-600">
                    {item.count}
                  </span>
                </div>
              </div>
              <span className="text-xs font-medium text-gray-600 mt-2">
                {item.day}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Badges Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-3xl p-6 shadow-xl border-4 border-yellow-200 max-w-md mx-auto"
      >
        <h2 className="text-2xl font-bold text-purple-600 text-center mb-4">
          🏅 My Badges
        </h2>
        <div className="grid grid-cols-5 gap-3">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className={`flex flex-col items-center p-2 rounded-xl ${
                badge.earned
                  ? 'bg-gradient-to-b from-yellow-100 to-yellow-200 border-2 border-yellow-400'
                  : 'bg-gray-100 border-2 border-gray-300 opacity-50'
              }`}
            >
              <span className={`text-3xl ${!badge.earned && 'grayscale'}`}>
                {badge.earned ? badge.emoji : '🔒'}
              </span>
              <span className="text-[10px] text-center mt-1 font-medium text-gray-700">
                {badge.earned ? badge.name : '???'}
              </span>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-gray-500 text-sm mt-4">
          {badges.filter(b => b.earned).length} of {badges.length} badges earned!
        </p>
      </motion.div>

      {/* Motivational Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center mt-8"
      >
        <p className="text-2xl">🌟</p>
        <p className="text-lg text-purple-600 font-medium">
          Keep up the great work, superstar!
        </p>
      </motion.div>
    </div>
  );
}