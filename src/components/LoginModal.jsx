import { useState } from 'react';
import { motion } from 'framer-motion';
import AvatarPicker from './AvatarPicker';

export default function LoginModal({ onComplete }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(null);

  const handleContinue = () => {
    if (step === 1 && avatar) {
      setStep(2);
    } else if (step === 2 && name.trim()) {
      onComplete(name.trim(), avatar);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl"
      >
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🎒</div>
          <h2 className="text-2xl font-bold text-purple-600">
            {step === 1 ? "Welcome! Pick Your Avatar!" : "What's Your Name?"}
          </h2>
          <p className="text-gray-500 mt-1">
            {step === 1 ? "Choose a picture that looks like you" : "Type your name below"}
          </p>
        </div>

        {step === 1 && (
          <div className="mb-6">
            <AvatarPicker selected={avatar} onSelect={setAvatar} />
          </div>
        )}

        {step === 2 && (
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4 justify-center">
              <div className="text-4xl">{avatar}</div>
              <div className="text-2xl">👋</div>
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type your name here..."
              className="w-full px-4 py-3 text-xl border-4 border-purple-200 rounded-2xl focus:border-purple-400 focus:outline-none text-center"
              autoFocus
              maxLength={20}
              onKeyDown={(e) => e.key === 'Enter' && handleContinue()}
            />
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleContinue}
          disabled={step === 1 ? !avatar : !name.trim()}
          className={`w-full py-4 rounded-2xl text-xl font-bold text-white transition-all
            ${step === 1
              ? avatar ? 'bg-purple-500' : 'bg-gray-300'
              : name.trim() ? 'bg-green-500' : 'bg-gray-300'
            }`}
        >
          {step === 1 ? 'Continue ➡️' : "Let's Go! 🚀"}
        </motion.button>
      </motion.div>
    </div>
  );
}