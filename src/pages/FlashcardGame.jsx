import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSpeech from '../hooks/useSpeech';
import { vocabulary } from '../data/vocabulary';
import StarReward from '../components/StarReward';
import ProgressBar from '../components/ProgressBar';

export default function FlashcardGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [knownWords, setKnownWords] = useState(new Set());
  const [showReward, setShowReward] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const { speak, isSpeaking } = useSpeech();

  const currentCard = vocabulary[currentIndex];
  const totalCards = vocabulary.length;
  const progress = ((currentIndex + 1) / totalCards) * 100;

  // Auto-advance timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNext();
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, currentIndex]);

  const handleSpeak = useCallback(() => {
    if (currentCard?.word) {
      speak(currentCard.word);
    }
  }, [currentCard, speak]);

  // Auto-play on card change
  useEffect(() => {
    if (isAutoPlaying && currentCard?.word) {
      const speakTimer = setTimeout(() => {
        speak(currentCard.word);
      }, 500);
      return () => clearTimeout(speakTimer);
    }
  }, [currentIndex, isAutoPlaying, currentCard, speak]);

  const handleNext = useCallback(() => {
    if (currentIndex < totalCards - 1) {
      setCurrentIndex((prev) => prev + 1);
      setTimeLeft(10);
    } else {
      setIsAutoPlaying(false);
    }
  }, [currentIndex, totalCards]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setTimeLeft(10);
    }
  }, [currentIndex]);

  const handleIKnowIt = useCallback(() => {
    setKnownWords((prev) => new Set([...prev, currentCard.word]));
    setShowReward(true);
    setTimeout(() => {
      setShowReward(false);
      handleNext();
    }, 1500);
  }, [currentCard, handleNext]);

  const handleToggleAutoPlay = useCallback(() => {
    setIsAutoPlaying((prev) => !prev);
    setTimeLeft(10);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-200 via-pink-100 to-purple-200 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <motion.div 
        className="text-center mb-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-purple-700 mb-2">
          🌈 Flashcard Fun! 🌈
        </h1>
        <p className="text-lg text-purple-600">
          Card {currentIndex + 1} of {totalCards} | ⭐ {knownWords.size} known
        </p>
      </motion.div>

      {/* Progress Bar */}
      <div className="w-full max-w-md mb-6">
        <ProgressBar progress={progress} />
      </div>

      {/* Auto-play indicator */}
      {isAutoPlaying && (
        <motion.div 
          className="flex items-center gap-2 mb-4 bg-white px-4 py-2 rounded-full shadow-md"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          <span className="text-xl">⏰</span>
          <span className="text-lg font-bold text-purple-700">{timeLeft}s</span>
        </motion.div>
      )}

      {/* Flashcard */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: 300, opacity: 0, rotate: 10 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          exit={{ x: -300, opacity: 0, rotate: -10 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 max-w-sm w-full relative overflow-hidden"
          style={{
            boxShadow: '0 20px 60px rgba(147, 51, 234, 0.3)',
          }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400" />
          
          {/* Image */}
          <motion.div 
            className="w-48 h-48 md:w-56 md:h-56 mx-auto mb-4 rounded-2xl overflow-hidden bg-gray-100"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <img 
              src={currentCard.image} 
              alt={currentCard.word}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Word */}
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center text-purple-700 mb-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
          >
            {currentCard.word}
          </motion.h2>

          {/* Khmer translation */}
          <p className="text-xl md:text-2xl text-center text-pink-500 font-semibold mb-4">
            {currentCard.khmer}
          </p>

          {/* Speak button */}
          <motion.button
            onClick={handleSpeak}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-400 to-teal-400 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
            whileTap={{ scale: 0.95 }}
            disabled={isSpeaking}
          >
            <span className="text-2xl">🔊</span>
            {isSpeaking ? 'Speaking...' : 'Hear It'}
          </motion.button>
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex gap-4 mt-6 flex-wrap justify-center">
        <motion.button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="bg-white text-purple-600 font-bold py-4 px-8 rounded-2xl shadow-lg flex items-center gap-2 text-xl disabled:opacity-40 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ minWidth: '140px' }}
        >
          <span className="text-3xl">👈</span> Prev
        </motion.button>

        <motion.button
          onClick={handleIKnowIt}
          className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold py-4 px-8 rounded-2xl shadow-lg flex items-center gap-2 text-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ minWidth: '160px' }}
        >
          <span className="text-3xl">⭐</span> I Know It!
        </motion.button>

        <motion.button
          onClick={handleNext}
          disabled={currentIndex === totalCards - 1}
          className="bg-white text-purple-600 font-bold py-4 px-8 rounded-2xl shadow-lg flex items-center gap-2 text-xl disabled:opacity-40 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ minWidth: '140px' }}
        >
          Next <span className="text-3xl">👉</span>
        </motion.button>
      </div>

      {/* Auto-play toggle */}
      <motion.button
        onClick={handleToggleAutoPlay}
        className={`mt-4 font-bold py-3 px-8 rounded-full text-lg shadow-md flex items-center gap-2 ${
          isAutoPlaying 
            ? 'bg-purple-500 text-white' 
            : 'bg-white text-purple-600 border-2 border-purple-400'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ minWidth: '180px', minHeight: '60px' }}
      >
        <span className="text-2xl">{isAutoPlaying ? '⏸️' : '▶️'}</span>
        {isAutoPlaying ? 'Stop Auto' : 'Auto Play'}
      </motion.button>

      {/* Category badge */}
      <motion.div 
        className="mt-4 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={currentCard?.category}
      >
        {currentCard?.category?.toUpperCase()}
      </motion.div>

      {/* Star Reward */}
      <StarReward show={showReward} message="Great Job! 🎉" />
    </div>
  );
}