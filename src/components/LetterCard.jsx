import { useState } from 'react';

export default function LetterCard({ letter, onLetterClick, isCompleted }) {
  const [isPressed, setIsPressed] = useState(false);

  const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#6BCB77'];
  const bgColor = colors[letter.charCodeAt(0) % colors.length];

  const handleClick = () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 200);
    onLetterClick?.(letter);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        ...styles.card,
        backgroundColor: bgColor,
        transform: isPressed ? 'scale(0.95)' : 'scale(1)',
        borderColor: isCompleted ? '#000' : 'transparent',
        borderWidth: isCompleted ? '4px' : '0',
      }}
    >
      <span style={styles.letter}>{letter}</span>
      {isCompleted && <span style={styles.checkmark}>✅</span>}
    </button>
  );
}

const styles = {
  card: {
    width: '100px',
    height: '100px',
    borderRadius: '20px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
    transition: 'all 0.15s ease',
    position: 'relative',
  },
  letter: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#fff',
    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
  },
  checkmark: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    fontSize: '18px',
  },
};