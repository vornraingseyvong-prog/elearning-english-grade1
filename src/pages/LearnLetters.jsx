import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSpeech from '../hooks/useSpeech';
import LetterCard from '../components/LetterCard';
import StarReward from '../components/StarReward';
import ProgressBar from '../components/ProgressBar';

// SVG Letter Stroke Drawing component
const LetterStrokeAnimation = ({ letter, isAnimating }) => {
  const letterPath = getLetterPath(letter);
  
  return (
    <svg viewBox="0 0 100 100" className="w-40 h-40">
      {/* Background letter outline */}
      <text
        x="50"
        y="70"
        textAnchor="middle"
        fontSize="60"
        fontWeight="bold"
        fill="#e0e0e0"
      >
        {letter}
      </text>
      {/* Animated stroke */}
      <motion.path
        d={letterPath}
        fill="none"
        stroke="#9B59B6"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: isAnimating ? 1 : 0, 
          opacity: isAnimating ? 1 : 0 
        }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />
    </svg>
  );
};

// Get SVG path for each letter (simplified paths for animation)
function getLetterPath(letter) {
  const paths = {
    A: 'M50 10 L20 90 M30 60 L70 60 M25 90 L75 90',
    B: 'M20 10 L20 90 M20 10 Q60 10 60 30 Q60 50 20 50 M20 50 Q70 50 70 70 Q70 90 20 90',
    C: 'M70 20 Q30 10 30 50 Q30 90 70 80',
    D: 'M20 10 L20 90 M20 10 Q60 10 70 50 Q60 90 20 90',
    E: 'M70 10 L20 10 L20 50 M20 50 L60 50 M20 50 L20 90 M20 90 L70 90',
    F: 'M70 10 L20 10 L20 50 M20 50 L60 50 M20 50 L20 90',
    G: 'M70 20 Q30 10 30 50 Q30 90 70 80 M50 50 L70 50',
    H: 'M20 10 L20 90 M70 10 L70 90 M20 50 L70 50',
    I: 'M30 10 L60 10 M45 10 L45 90 M30 90 L60 90',
    J: 'M30 10 L70 10 M50 10 L50 70 Q50 90 30 90',
    K: 'M20 10 L20 90 M70 10 L20 50 M30 45 L70 90',
    L: 'M20 10 L20 90 L70 90',
    M: 'M10 90 L10 10 L50 60 L90 10 L90 90',
    N: 'M20 90 L20 10 L80 90 L80 10',
    O: 'M50 10 Q20 10 20 50 Q20 90 50 90 Q80 90 80 50 Q80 10 50 10',
    P: 'M20 90 L20 10 M20 10 Q70 10 70 30 Q70 50 20 50',
    Q: 'M50 10 Q20 10 20 50 Q20 90 50 90 Q80 90 80 50 Q80 10 50 10 M55 60 L80 90',
    R: 'M20 90 L20 10 M20 10 Q60 10 60 30 Q60 50 20 50 M45 50 L80 90',
    S: 'M70 20 Q30 10 30 30 Q30 50 70 50 Q70 70 30 90 Q30 80 70 80',
    T: 'M10 10 L90 10 M50 10 L50 90',
    U: 'M20 10 L20 70 Q20 90 50 90 Q80 90 80 70 L80 10',
    V: 'M10 10 L50 90 L90 10',
    W: 'M10 10 L30 90 L50 50 L70 90 L90 10',
    X: 'M20 10 L80 90 M80 10 L20 90',
    Y: 'M20 10 L50 50 L80 10 M50 50 L50 90',
    Z: 'M20 10 L80 10 L20 90 L80 90',
  };
  return paths[letter] || 'M10 10 L90 90 M90 10 L10 90';
}

// Fireworks component for completion celebration
const Firework = ({ x, y }) => (
  <motion.div
    className="fixed"
    style={{ left: x, top: y }}
    initial={{ scale: 0 }}
    animate={{
      scale: [0, 1.5, 0],
      opacity: [0, 1, 0],
    }}
    transition={{ duration: 1, ease: 'easeOut' }}
  >
    <div className="relative">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{
            backgroundColor: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#9B59B6', '#6BCB77'][
              Math.floor(Math.random() * 5)
            ],
          }}
          animate={{
            x: Math.cos((i * 30 * Math.PI) / 180) * 80,
            y: Math.sin((i * 30 * Math.PI) / 180) * 80,
            opacity: [1, 0],
            scale: [1, 0],
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      ))}
    </div>
  </motion.div>
);

// Sample words for each letter A-Z with images
const letterData = {
  A: { word: 'Apple', image: '🍎', sound: '/sounds/apple.mp3' },
  B: { word: 'Ball', image: '⚽', sound: '/sounds/ball.mp3' },
  C: { word: 'Cat', image: '🐱', sound: '/sounds/cat.mp3' },
  D: { word: 'Dog', image: '🐕', sound: '/sounds/dog.mp3' },
  E: { word: 'Elephant', image: '🐘', sound: '/sounds/elephant.mp3' },
  F: { word: 'Fish', image: '🐟', sound: '/sounds/fish.mp3' },
  G: { word: 'Grapes', image: '🍇', sound: '/sounds/grapes.mp3' },
  H: { word: 'House', image: '🏠', sound: '/sounds/house.mp3' },
  I: { word: 'Ice Cream', image: '🍦', sound: '/sounds/icecream.mp3' },
  J: { word: 'Jellyfish', image: '🪼', sound: '/sounds/jellyfish.mp3' },
  K: { word: 'Kite', image: '🪁', sound: '/sounds/kite.mp3' },
  L: { word: 'Lion', image: '🦁', sound: '/sounds/lion.mp3' },
  M: { word: 'Moon', image: '🌙', sound: '/sounds/moon.mp3' },
  N: { word: 'Nest', image: '🪺', sound: '/sounds/nest.mp3' },
  O: { word: 'Orange', image: '🍊', sound: '/sounds/orange.mp3' },
  P: { word: 'Penguin', image: '🐧', sound: '/sounds/penguin.mp3' },
  Q: { word: 'Queen', image: '👑', sound: '/sounds/queen.mp3' },
  R: { word: 'Rainbow', image: '🌈', sound: '/sounds/rainbow.mp3' },
  S: { word: 'Sun', image: '☀️', sound: '/sounds/sun.mp3' },
  T: { word: 'Tiger', image: '🐯', sound: '/sounds/tiger.mp3' },
  U: { word: 'Umbrella', image: '☂️', sound: '/sounds/umbrella.mp3' },
  V: { word: 'Violin', image: '🎻', sound: '/sounds/violin.mp3' },
  W: { word: 'Watermelon', image: '🍉', sound: '/sounds/watermelon.mp3' },
  X: { word: 'Xylophone', image: '🎶', sound: '/sounds/xylophone.mp3' },
  Y: { word: 'Yarn', image: '🧶', sound: '/sounds/yarn.mp3' },
  Z: { word: 'Zebra', image: '🦓', sound: '/sounds/zebra.mp3' },
};

const VOWELS = ['A', 'E', 'I', 'O', 'U'];
const CONSONANTS = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];

const letters = Object.keys(letterData);
const STORAGE_KEY = 'learn-letters-progress';

// Quiz questions generator
const generateQuizQuestion = (letters) => {
  const randomLetter = letters[Math.floor(Math.random() * letters.length)];
  const wrongOptions = letters.filter(l => l !== randomLetter).slice(0, 3);
  const options = [...wrongOptions, randomLetter].sort(() => Math.random() - 0.5);
  return {
    letter: randomLetter,
    word: letterData[randomLetter].word,
    image: letterData[randomLetter].image,
    options,
  };
};

export default function LearnLetters() {
  const [completedLetters, setCompletedLetters] = useState(new Set());
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [showReward, setShowReward] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'vowels', 'consonants'
  const [quizMode, setQuizMode] = useState(false);
  const [quizQuestion, setQuizQuestion] = useState(null);
  const [quizFeedback, setQuizFeedback] = useState(null);
  const [animateLetter, setAnimateLetter] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const { speak, isSpeaking } = useSpeech();

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCompletedLetters(new Set(parsed));
      } catch (e) {
        console.warn('Failed to load progress');
      }
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...completedLetters]));
  }, [completedLetters]);

  // Check for all 26 complete
  useEffect(() => {
    if (completedLetters.size === 26) {
      setShowFireworks(true);
      setTimeout(() => setShowFireworks(false), 5000);
    }
  }, [completedLetters]);

  const currentLetterInfo = selectedLetter ? letterData[selectedLetter] : null;
  const progress = completedLetters.size;

  // Get filtered letters based on current tab
  const getFilteredLetters = () => {
    switch (filter) {
      case 'vowels':
        return letters.filter(l => VOWELS.includes(l));
      case 'consonants':
        return letters.filter(l => CONSONANTS.includes(l));
      default:
        return letters;
    }
  };

  const filteredLetters = getFilteredLetters();

  // Split letters into rows for grid display
  const rows = [];
  for (let i = 0; i < filteredLetters.length; i += 6) {
    rows.push(filteredLetters.slice(i, i + 6));
  }

  const handleLetterClick = useCallback((letter) => {
    setSelectedLetter(letter);
    setAnimateLetter(true);
    setTimeout(() => setAnimateLetter(false), 1500);
    speak(letter);
  }, [speak]);

  const handleMarkComplete = useCallback(() => {
    if (selectedLetter && !completedLetters.has(selectedLetter)) {
      const newCompleted = new Set(completedLetters);
      newCompleted.add(selectedLetter);
      setCompletedLetters(newCompleted);
      setShowReward(true);
      speak(`Great job! You learned ${selectedLetter}!`);

      setTimeout(() => {
        setShowReward(false);
      }, 2000);
    }
  }, [selectedLetter, completedLetters, speak]);

  const handleSpeakWord = useCallback(() => {
    if (currentLetterInfo?.word) {
      speak(currentLetterInfo.word);
    }
  }, [currentLetterInfo, speak]);

  // Quiz mode functions
  const startQuiz = useCallback(() => {
    setQuizMode(true);
    setQuizQuestion(generateQuizQuestion(filteredLetters));
    setQuizFeedback(null);
  }, [filteredLetters]);

  const handleQuizAnswer = useCallback((answer) => {
    if (answer === quizQuestion.letter) {
      setQuizFeedback('correct');
      speak(`Correct! ${quizQuestion.letter} for ${quizQuestion.word}!`);
      
      // Mark letter as completed
      if (!completedLetters.has(quizQuestion.letter)) {
        const newCompleted = new Set(completedLetters);
        newCompleted.add(quizQuestion.letter);
        setCompletedLetters(newCompleted);
      }

      setTimeout(() => {
        setQuizFeedback(null);
        if (filteredLetters.filter(l => !completedLetters.has(l) || l === quizQuestion.letter).length > 1) {
          setQuizQuestion(generateQuizQuestion(
            filteredLetters.filter(l => l !== quizQuestion.letter || !completedLetters.has(l))
          ));
        } else {
          setQuizMode(false);
        }
      }, 1500);
    } else {
      setQuizFeedback('wrong');
      speak('Try again!');
      setTimeout(() => setQuizFeedback(null), 1000);
    }
  }, [quizQuestion, completedLetters, speak, filteredLetters]);

  // Fireworks positions
  const fireworkPositions = [
    { x: '20%', y: '30%' },
    { x: '80%', y: '30%' },
    { x: '50%', y: '40%' },
    { x: '30%', y: '60%' },
    { x: '70%', y: '60%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 via-purple-100 to-pink-200 flex flex-col items-center p-4 relative overflow-hidden">
      {/* Fireworks celebration */}
      <AnimatePresence>
        {showFireworks && fireworkPositions.map((pos, i) => (
          <Firework key={i} x={pos.x} y={pos.y} />
        ))}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        className="text-center mb-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-purple-700 mb-2">
          🌟 Learn Your ABCs! 🌟
        </h1>
        <p className="text-lg text-purple-600">
          {quizMode ? 'Quiz Mode - tap the correct starting letter!' : 'Tap a letter to hear its sound!'}
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        className="flex gap-2 mb-6 bg-white rounded-full p-2 shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {[
          { key: 'all', label: '✨ All' },
          { key: 'vowels', label: '🎯 Vowels (AEIOU)' },
          { key: 'consonants', label: '🔤 Consonants' },
        ].map(tab => (
          <motion.button
            key={tab.key}
            onClick={() => {
              setFilter(tab.key);
              if (quizMode) setQuizMode(false);
            }}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              filter === tab.key
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-purple-100'
            }`}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            {tab.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Quiz Mode Toggle Button */}
      <motion.button
        onClick={quizMode ? () => setQuizMode(false) : startQuiz}
        className={`mb-6 px-6 py-3 rounded-full font-bold text-lg shadow-lg ${
          quizMode 
            ? 'bg-gradient-to-r from-red-400 to-orange-400' 
            : 'bg-gradient-to-r from-green-400 to-teal-400'
        } text-white`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {quizMode ? '❌ Exit Quiz Mode' : '🎮 Start Quiz Mode'}
      </motion.button>

      {/* Progress Bar */}
      <div className="w-full max-w-2xl mb-6">
        <ProgressBar
          current={progress}
          total={26}
          label="Letters Learned"
        />
      </div>

      {/* Quiz Mode Display */}
      <AnimatePresence mode="wait">
        {quizMode && quizQuestion && (
          <motion.div
            key="quiz"
            className="bg-white rounded-3xl shadow-2xl p-8 mb-6 max-w-md w-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            style={{ boxShadow: '0 20px 60px rgba(147, 51, 234, 0.3)' }}
          >
            <div className="text-center">
              <p className="text-xl text-gray-500 mb-2">Which letter makes this sound?</p>
              <motion.div
                className="text-6xl mb-4"
                animate={quizFeedback === 'correct' ? { scale: [1, 1.2, 1] } : {}}
              >
                {quizQuestion.image}
              </motion.div>
              <p className="text-3xl font-bold text-purple-700 mb-6">
                {quizQuestion.word}
              </p>

              {/* Answer Options */}
              <div className="grid grid-cols-2 gap-4">
                {quizQuestion.options.map(option => (
                  <motion.button
                    key={option}
                    onClick={() => handleQuizAnswer(option)}
                    className={`text-4xl font-bold py-4 px-6 rounded-2xl shadow-lg transition-all ${
                      quizFeedback === 'correct' && option === quizQuestion.letter
                        ? 'bg-green-400 text-white'
                        : quizFeedback === 'wrong' && option !== quizQuestion.letter
                        ? 'bg-gray-200 text-gray-400'
                        : 'bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:scale-105'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={quizFeedback !== null}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>

              {quizFeedback === 'correct' && (
                <motion.p
                  className="mt-4 text-2xl font-bold text-green-600"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  🎉 Correct! Great job!
                </motion.p>
              )}
              {quizFeedback === 'wrong' && (
                <motion.p
                  className="mt-4 text-2xl font-bold text-red-600"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  🤔 Try again!
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Letter Grid - 6x5 layout */}
      {!quizMode && (
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 mb-6">
          {rows.map((row, rowIndex) => (
            <motion.div
              key={rowIndex}
              className="contents"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: rowIndex * 0.1 }}
            >
              {row.map((letter) => (
                <LetterCard
                  key={letter}
                  letter={letter}
                  onLetterClick={handleLetterClick}
                  isCompleted={completedLetters.has(letter)}
                />
              ))}
            </motion.div>
          ))}
        </div>
      )}

      {/* Selected Letter Display */}
      {!quizMode && selectedLetter && currentLetterInfo && (
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 max-w-sm w-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{
            boxShadow: '0 20px 60px rgba(147, 51, 234, 0.3)',
          }}
        >
          {/* Decorative header */}
          <div className="w-full h-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 rounded-full mb-4" />

          {/* Letter stroke animation */}
          <div className="flex justify-center mb-4">
            <LetterStrokeAnimation letter={selectedLetter} isAnimating={animateLetter} />
          </div>

          {/* Sample word with emoji image */}
          <motion.div
            className="flex flex-col items-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-6xl mb-2">{currentLetterInfo.image}</div>
            <h3 className="text-2xl font-bold text-purple-700">
              {currentLetterInfo.word}
            </h3>
          </motion.div>

          {/* Speak word button */}
          <motion.button
            onClick={handleSpeakWord}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-400 to-teal-400 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isSpeaking}
          >
            <span className="text-2xl">🔊</span>
            {isSpeaking ? 'Speaking...' : `Hear "${currentLetterInfo.word}"`}
          </motion.button>

          {/* Mark as learned button */}
          {!completedLetters.has(selectedLetter) && (
            <motion.button
              onClick={handleMarkComplete}
              className="w-full mt-3 flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-2xl">⭐</span>
              I Learned This!
            </motion.button>
          )}

          {/* Completed badge */}
          {completedLetters.has(selectedLetter) && (
            <motion.div
              className="mt-3 bg-green-100 text-green-700 px-4 py-2 rounded-full text-center font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              ✅ Great job! You know this letter!
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Instructions */}
      {!quizMode && !selectedLetter && (
        <motion.p
          className="text-xl text-purple-600 text-center mt-4 bg-white bg-opacity-50 px-6 py-3 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          👆 Tap any letter above to start learning!
        </motion.p>
      )}

      {/* Completion celebration */}
      {progress === 26 && (
        <motion.div
          className="mt-6 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 rounded-full px-8 py-4 text-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <p className="text-2xl font-bold text-white">
            🎉 Congratulations! You learned all 26 letters! 🎉
          </p>
        </motion.div>
      )}

      {/* Star Reward */}
      <StarReward show={showReward} message="Awesome! ⭐" />
    </div>
  );
}