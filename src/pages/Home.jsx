import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import StarReward from '../components/StarReward';
import ProgressBar from '../components/ProgressBar';
import { useAuth } from '../context/AuthContext';

const activities = [
  {
    id: 'letters',
    title: 'Letters',
    emoji: '🔤',
    color: '#FF6B6B',
    description: 'Learn your ABCs!',
    path: '/letters',
  },
  {
    id: 'flashcards',
    title: 'Flashcards',
    emoji: '📚',
    color: '#4ECDC4',
    description: 'Practice words!',
    path: '/flashcards',
  },
  {
    id: 'matching',
    title: 'Matching Game',
    emoji: '🎮',
    color: '#9B59B6',
    description: 'Find the pairs!',
    path: '/matching',
  },
  {
    id: 'stars',
    title: 'My Stars',
    emoji: '⭐',
    color: '#FFE66D',
    description: 'See your rewards!',
    path: '/stars',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      type: 'spring',
      stiffness: 120,
    },
  }),
};

export default function Home() {
  const { currentProfile } = useAuth();
  const [showConfetti, setShowConfetti] = useState(false);

  const studentName = currentProfile?.name || 'Friend';
  const totalStars = currentProfile?.totalStars || 0;

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const confettiColors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#9B59B6', '#6BCB77', '#FF9F43', '#54A0FF'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-6 relative overflow-hidden">
      {/* Confetti Burst on Load */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -20, x: Math.random() * window.innerWidth, opacity: 1 }}
                animate={{
                  y: window.innerHeight + 100,
                  x: Math.random() * window.innerWidth,
                  opacity: 0,
                  rotate: Math.random() * 720,
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.02,
                  ease: 'easeOut',
                }}
                style={{
                  position: 'fixed',
                  top: 0,
                  width: 10,
                  height: 10,
                  backgroundColor: confettiColors[i % confettiColors.length],
                  borderRadius: '50%',
                  pointerEvents: 'none',
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-purple-600 mb-2">
          🌟 Hi, {studentName}! 🌟
        </h1>
        <p className="text-xl text-gray-600">Ready to learn English today?</p>
      </motion.div>

      {/* Star Count Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex justify-center mb-8"
      >
        <motion.div
          className="bg-yellow-400 rounded-full px-8 py-4 shadow-lg border-4 border-white"
          animate={{ boxShadow: ['0 0 0 0 rgba(255, 230, 109, 0.7)', '0 0 0 20px rgba(255, 230, 109, 0)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-3xl font-bold text-yellow-900">
            ⭐ {totalStars} Stars Collected!
          </span>
        </motion.div>
      </motion.div>

      {/* Activity Cards Grid */}
      <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
        {activities.map((activity, index) => (
          <Link key={activity.id} to={activity.path}>
            <motion.div
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer rounded-3xl p-6 flex flex-col items-center justify-center shadow-xl border-4 border-white"
              style={{
                backgroundColor: activity.color,
                minHeight: '180px',
              }}
            >
              <span className="text-6xl mb-3">{activity.emoji}</span>
              <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-md">
                {activity.title}
              </h2>
              <p className="text-white text-lg font-medium opacity-90">
                {activity.description}
              </p>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Star Reward Component */}
      <StarReward show={false} />
    </div>
  );
}