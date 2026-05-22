import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { alphabet } from '../data/vocabulary';
import StarReward from '../components/StarReward';
import useSpeech from '../hooks/useSpeech';

// Phonics quiz: hear a sound, pick the letter
const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

export default function PhonicsGame() {
  const TOTAL_QUESTIONS = 10;
  const [gameQuestions, setGameQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [stars, setStars] = useState(0);
  const { speak, isSpeaking } = useSpeech();

  // Generate 10 random questions
  useEffect(() => {
    const shuffled = shuffleArray(alphabet).slice(0, TOTAL_QUESTIONS);
    setGameQuestions(shuffled);
  }, []);

  const currentQuestion = gameQuestions[currentIndex];

  // Generate 4 choices: correct + 3 wrong
  const choices = useCallback(() => {
    if (!currentQuestion) return [];
    const wrong = shuffleArray(alphabet.filter((l) => l.letter !== currentQuestion.letter))
      .slice(0, 3)
      .map((l) => ({ letter: l.letter, isCorrect: false }));
    const correct = { letter: currentQuestion.letter, isCorrect: true };
    return shuffleArray([correct, ...wrong]);
  }, [currentQuestion]);

  const handleChoice = useCallback(
    (choice) => {
      if (selectedAnswer || !currentQuestion) return;

      setSelectedAnswer(choice.letter);

      if (choice.isCorrect) {
        setIsCorrect(true);
        setScore((s) => s + 1);
        setShowReward(true);
        speak(currentQuestion.letter);
        setTimeout(() => {
          setShowReward(false);
          advanceQuestion();
        }, 1500);
      } else {
        setIsCorrect(false);
        // Show correct answer
        setTimeout(() => {
          speak(currentQuestion.letter);
          setTimeout(() => advanceQuestion(), 1000);
        }, 800);
      }
    },
    [selectedAnswer, currentQuestion, speak]
  );

  const advanceQuestion = useCallback(() => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    if (currentIndex < TOTAL_QUESTIONS - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setGameOver(true);
      // Calculate stars: 3 stars = 8-10, 2 stars = 5-7, 1 star = 1-4
      if (score >= 8) setStars(3);
      else if (score >= 5) setStars(2);
      else if (score >= 1) setStars(1);
      else setStars(0);
    }
  }, [currentIndex, score]);

  const playAgain = () => {
    setGameQuestions(shuffleArray(alphabet).slice(0, TOTAL_QUESTIONS));
    setCurrentIndex(0);
    setScore(0);
    setStars(0);
    setGameOver(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const playSound = () => {
    if (currentQuestion) {
      speak(currentQuestion.sound);
    }
  };

  if (!currentQuestion && !gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-200 via-pink-100 to-purple-200 flex items-center justify-center">
        <p className="text-2xl text-purple-600">Loading...</p>
      </div>
    );
  }

  if (gameOver) {
    const starDisplay = Array.from({ length: 3 }, (_, i) => (
      <motion.span
        key={i}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: i * 0.2, type: 'spring', stiffness: 200 }}
        className={`text-5xl ${i < stars ? '' : 'opacity-30'}`}
      >
        ⭐
      </motion.span>
    ));

    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-200 via-pink-100 to-purple-200 flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-md w-full"
        >
          <h1 className="text-3xl font-bold text-purple-700 mb-4">🎉 Game Over! 🎉</h1>
          <div className="mb-4">{starDisplay}</div>
          <p className="text-2xl font-bold text-purple-600 mb-2">
            You got {score} out of {TOTAL_QUESTIONS}!
          </p>
          <p className="text-lg text-pink-500 mb-6">
            {score >= 8 ? '🌟 Amazing! 🌟' : score >= 5 ? '👍 Great job! 👍' : '💪 Keep practicing! 💪'}
          </p>
          <motion.button
            onClick={playAgain}
            className="bg-gradient-to-r from-green-400 to-teal-400 text-white font-bold py-4 px-10 rounded-full text-xl shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔄 Play Again!
          </motion.button>
        </motion.div>
        <StarReward show={score >= 8} message="You're a Star! 🌟" />
      </div>
    );
  }

  const currentChoices = choices();

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-200 via-pink-100 to-purple-200 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <motion.div
        className="text-center mb-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-purple-700 mb-2">
          🔤 Phonics Fun! 🔤
        </h1>
        <p className="text-lg text-purple-600">
          Question {currentIndex + 1} of {TOTAL_QUESTIONS} | ⭐ {score}
        </p>
      </motion.div>

      {/* Progress Bar */}
      <div className="w-full max-w-md mb-6">
        <div className="h-4 bg-white/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / TOTAL_QUESTIONS) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Sound Play Button */}
      <motion.button
        onClick={playSound}
        className="bg-gradient-to-r from-green-400 to-teal-400 text-white font-bold py-6 px-12 rounded-3xl text-2xl shadow-lg mb-8"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isSpeaking}
      >
        <span className="text-3xl mr-2">🔊</span>
        {isSpeaking ? 'Playing...' : 'Hear the Sound'}
      </motion.button>

      <p className="text-xl text-purple-600 mb-6 font-semibold">
        Which letter makes this sound?
      </p>

      {/* Answer Choices */}
      <div className="grid grid-cols-2 gap-4 max-w-md w-full mb-6">
        <AnimatePresence>
          {currentChoices.map((choice, idx) => (
            <motion.button
              key={choice.letter + idx}
              onClick={() => handleChoice(choice)}
              disabled={selectedAnswer !== null}
              className={`
                relative h-24 rounded-2xl text-4xl font-bold shadow-lg
                ${selectedAnswer === choice.letter
                  ? isCorrect
                    ? 'bg-green-400 text-white scale-105'
                    : 'bg-red-400 text-white'
                  : 'bg-white text-purple-700 hover:bg-purple-100'
                }
                ${!selectedAnswer ? 'cursor-pointer' : 'cursor-not-allowed'}
              `}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={!selectedAnswer ? { scale: 1.05 } : {}}
              whileTap={!selectedAnswer ? { scale: 0.95 } : {}}
            >
              {choice.letter}
              {selectedAnswer === choice.letter && isCorrect && (
                <span className="absolute -top-2 -right-2 text-2xl">✅</span>
              )}
              {selectedAnswer === choice.letter && !isCorrect && (
                <span className="absolute -top-2 -right-2 text-2xl">❌</span>
              )}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Feedback */}
      {selectedAnswer && (
        <motion.p
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`text-xl font-bold ${isCorrect ? 'text-green-600' : 'text-red-500'}`}
        >
          {isCorrect ? '🎉 Correct! 🎉' : `The answer is ${currentQuestion.letter}`}
        </motion.p>
      )}

      {/* Star Reward */}
      <StarReward show={showReward} message="⭐ Great Job! ⭐" />
    </div>
  );
}