import { motion } from 'framer-motion';
import StarReward from '../components/StarReward';

export default function DragDropGame() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 via-purple-100 to-pink-200 flex flex-col items-center justify-center p-4">
      {/* Coming Soon Card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center max-w-lg w-full"
      >
        {/* Animated Coming Soon */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: 'easeInOut',
          }}
          className="mb-6"
        >
          <span className="text-8xl">🧩</span>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-purple-700 mb-4"
        >
          🚧 Coming Soon! 🚧
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-purple-600 mb-6"
        >
          Drag and Drop Game is under construction!
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4 mb-6"
        >
          <p className="text-purple-700 font-semibold mb-2">✨ Coming features:</p>
          <ul className="text-left text-purple-600 space-y-1 text-sm">
            <li>🖱️ Drag letters to match words</li>
            <li>🧠 Match pictures with words</li>
            <li>🌟 Earn stars for each match</li>
            <li>🎨 Colorful, child-friendly design</li>
          </ul>
        </motion.div>

        {/* Loading dots animation */}
        <div className="flex justify-center gap-2 mb-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-purple-400 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 0.6,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>

        {/* Decorative elements */}
        <div className="flex justify-center gap-4 text-3xl">
          <motion.span
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            🎨
          </motion.span>
          <motion.span
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
          >
            ⭐
          </motion.span>
          <motion.span
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
          >
            🧩
          </motion.span>
        </div>
      </motion.div>

      {/* Star Reward (shown for future completion) */}
      <StarReward show={false} message="🎉 Great Job! 🎉" />
    </div>
  );
}