import { motion } from 'framer-motion';

export default function SpeechPractice() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-6 flex flex-col items-center justify-center">
      {/* Mic Illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
        className="mb-8"
      >
        <div className="relative">
          {/* Mic body */}
          <div className="w-40 h-56 bg-gradient-to-b from-blue-400 to-blue-600 rounded-3xl shadow-2xl border-4 border-white flex items-center justify-center">
            <div className="w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center border-4 border-blue-300">
              <span className="text-6xl">🎤</span>
            </div>
          </div>
          {/* Mic stand */}
          <div className="w-8 h-16 bg-gray-400 mx-auto rounded-b-lg mt-[-4px]" />
          <div className="w-32 h-4 bg-gray-500 mx-auto rounded-full mt-1" />
          {/* Sound waves */}
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute top-1/2 left-[-60px] text-4xl"
          >
            🔊
          </motion.div>
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
            className="absolute top-1/2 right-[-60px] text-4xl"
          >
            🔊
          </motion.div>
        </div>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-4xl font-bold text-purple-600 mb-4 text-center"
      >
        🎯 Speech Practice 🎯
      </motion.h1>

      {/* Placeholder Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="bg-white rounded-3xl p-8 shadow-xl border-4 border-purple-200 max-w-md text-center mb-6"
      >
        <p className="text-2xl text-gray-700 mb-4">
          👋 Hi, friend!
        </p>
        <p className="text-xl text-gray-600 mb-4">
          Speak into the microphone and practice your English words!
        </p>
        <div className="text-5xl mb-4">🗣️</div>
        <p className="text-lg text-gray-500 italic">
          Coming soon...
        </p>
      </motion.div>

      {/* Fun decorative elements */}
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-6xl"
      >
        ⭐
      </motion.div>

      {/* Available words hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 bg-yellow-100 rounded-2xl px-6 py-3 border-2 border-yellow-300"
      >
        <p className="text-yellow-700 font-medium">
          💡 You'll practice: Animals, Colors, Numbers & More!
        </p>
      </motion.div>
    </div>
  );
}