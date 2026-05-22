import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarReward from '../components/StarReward';

// Simple confetti component
function Confetti() {
  const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181', '#AA96DA'];
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2,
    size: 8 + Math.random() * 8,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{ y: -20, x: piece.x + 'vw', opacity: 1, rotate: 0 }}
          animate={{
            y: '110vh',
            rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  );
}

// Card component with flip animation
function Card({ card, isFlipped, isMatched, isWrong, onClick, disabled }) {
  return (
    <motion.div
      className="cursor-pointer"
      onClick={() => !disabled && !isFlipped && !isMatched && onClick()}
      whileHover={!disabled && !isFlipped && !isMatched ? { scale: 1.05 } : {}}
      whileTap={!disabled && !isFlipped && !isMatched ? { scale: 0.95 } : {}}
      animate={
        isWrong
          ? { x: [0, -10, 10, -10, 10, 0] }
          : isMatched
          ? { scale: [1, 1.1, 1] }
          : {}
      }
      transition={{ duration: isWrong ? 0.4 : isMatched ? 0.3 : 0.2 }}
      style={{
        perspective: '1000px',
        width: '100%',
        aspectRatio: '1',
      }}
    >
      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped || isMatched ? 180 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{
          transformStyle: 'preserve-3d',
          position: 'relative',
        }}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 rounded-2xl flex items-center justify-center backface-hidden"
          style={{
            backfaceVisibility: 'hidden',
            background: isMatched
              ? 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)'
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: isMatched
              ? '0 0 20px rgba(78, 205, 196, 0.6), 0 8px 32px rgba(0,0,0,0.2)'
              : '0 8px 32px rgba(0,0,0,0.2)',
            border: isMatched ? '3px solid #2ECC71' : '3px solid rgba(255,255,255,0.3)',
          }}
        >
          {card.type === 'word' ? (
            <span
              className="text-white font-bold text-center px-2"
              style={{ fontSize: 'clamp(14px, 3vw, 20px)', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
            >
              {card.content}
            </span>
          ) : (
            <img
              src={card.content}
              alt="match"
              className="w-full h-full object-cover rounded-2xl"
            />
          )}
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 rounded-2xl flex items-center justify-center"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            border: '3px solid rgba(255,255,255,0.3)',
          }}
        >
          <span className="text-4xl">🎴</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function MatchingGame() {
  // Select 6 pairs for the game (3 word cards + 3 image cards = 6 cards, wait - we need 12 cards for 4x3)
  // 4x3 = 12 cards = 6 pairs (6 words matched to 6 images)
  // But we display cards shuffled, so we need pairs of (word, image) for 6 items = 12 cards
  const [gamePairs] = useState(() => {
    const animals = [
      { word: 'Cat', image: 'https://picsum.photos/seed/cat/300/300' },
      { word: 'Dog', image: 'https://picsum.photos/seed/dog/300/300' },
      { word: 'Bird', image: 'https://picsum.photos/seed/bird/300/300' },
      { word: 'Fish', image: 'https://picsum.photos/seed/fish/300/300' },
      { word: 'Apple', image: 'https://picsum.photos/seed/apple/300/300' },
      { word: 'Sun', image: 'https://picsum.photos/seed/sun/300/300' },
    ];
    return animals;
  });

  const createCards = useCallback(() => {
    const cards = [];
    gamePairs.forEach((pair, index) => {
      cards.push({
        id: `word-${index}`,
        pairId: index,
        type: 'word',
        content: pair.word,
        matched: false,
      });
      cards.push({
        id: `image-${index}`,
        pairId: index,
        type: 'image',
        content: pair.image,
        matched: false,
      });
    });
    // Shuffle cards
    return cards.sort(() => Math.random() - 0.5);
  }, [gamePairs]);

  const [cards, setCards] = useState(createCards);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [wrongMatch, setWrongMatch] = useState(null);
  const [showStar, setShowStar] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  // Check for win
  useEffect(() => {
    if (matchedPairs.length === gamePairs.length && matchedPairs.length > 0) {
      setTimeout(() => setShowConfetti(true), 500);
      setTimeout(() => setShowConfetti(false), 4000);
    }
  }, [matchedPairs, gamePairs.length]);

  const handleCardClick = (index) => {
    if (isLocked || flippedIndices.includes(index) || cards[index].matched) return;

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      setIsLocked(true);

      const [first, second] = newFlipped;
      const firstCard = cards[first];
      const secondCard = cards[second];

      if (firstCard.pairId === secondCard.pairId && firstCard.type !== secondCard.type) {
        // Match found!
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card, i) =>
              i === first || i === second ? { ...card, matched: true } : card
            )
          );
          setMatchedPairs((prev) => [...prev, firstCard.pairId]);
          setShowStar(true);
          setTimeout(() => setShowStar(false), 1200);
          setFlippedIndices([]);
          setIsLocked(false);
        }, 600);
      } else {
        // No match
        setTimeout(() => {
          setWrongMatch(newFlipped);
          setTimeout(() => {
            setWrongMatch(null);
            setFlippedIndices([]);
            setIsLocked(false);
          }, 400);
        }, 800);
      }
    }
  };

  const resetGame = () => {
    setCards(createCards());
    setFlippedIndices([]);
    setMatchedPairs([]);
    setWrongMatch(null);
    setMoves(0);
    setIsLocked(false);
    setShowConfetti(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-purple-200 p-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
          🎯 Match the Words! 🎯
        </h1>
        <p className="text-white text-lg mt-1 opacity-90">
          Match each word to its picture
        </p>
        <div className="flex justify-center gap-4 mt-3">
          <span className="bg-white/30 backdrop-blur px-4 py-2 rounded-full text-white font-semibold">
            ⭐ Pairs: {matchedPairs.length}/{gamePairs.length}
          </span>
          <span className="bg-white/30 backdrop-blur px-4 py-2 rounded-full text-white font-semibold">
            🎯 Moves: {moves}
          </span>
        </div>
      </div>

      {/* Game Board */}
      <div
        className="max-w-2xl mx-auto"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'clamp(8px, 2vw, 16px)',
        }}
      >
        <AnimatePresence>
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
            >
              <Card
                card={card}
                isFlipped={flippedIndices.includes(index)}
                isMatched={card.matched}
                isWrong={wrongMatch && wrongMatch.includes(index)}
                onClick={() => handleCardClick(index)}
                disabled={isLocked}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Reset Button */}
      <div className="text-center mt-6">
        <motion.button
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold px-8 py-3 rounded-full text-lg shadow-lg"
          onClick={resetGame}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ boxShadow: '0 4px 20px rgba(155, 89, 182, 0.4)' }}
        >
          🔄 Play Again!
        </motion.button>
      </div>

      {/* Win Celebration */}
      <AnimatePresence>
        {showConfetti && <Confetti />}
      </AnimatePresence>

      {/* Star Reward */}
      <StarReward show={showStar} message="🎉 Great Match! ⭐" />
    </div>
  );
}