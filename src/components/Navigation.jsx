import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/letters', emoji: '🔤', label: 'Letters', color: '#FF6B6B' },
  { path: '/flashcards', emoji: '📚', label: 'Words', color: '#4ECDC4' },
  { path: '/matching', emoji: '🎮', label: 'Match', color: '#9B59B6' },
  { path: '/stars', emoji: '⭐', label: 'Stars', color: '#FFE66D' },
];

export default function Navigation() {
  return (
    <nav style={styles.nav}>
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          style={({ isActive }) => ({
            ...styles.button,
            backgroundColor: isActive ? item.color : '#fff',
            color: isActive ? '#fff' : '#333',
            borderColor: item.color,
          })}
        >
          {({ isActive }) => (
            <motion.span
              style={styles.content}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span style={styles.emoji}>{item.emoji}</span>
              <span style={styles.label}>{item.label}</span>
            </motion.span>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

const styles = {
  nav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-around',
    padding: '12px 8px',
    backgroundColor: '#fff',
    boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
    borderTopLeftRadius: '24px',
    borderTopRightRadius: '24px',
    zIndex: 100,
  },
  button: {
    minWidth: '70px',
    minHeight: '60px',
    padding: '10px 14px',
    border: '3px solid',
    borderRadius: '16px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    textDecoration: 'none',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },
  emoji: {
    fontSize: '24px',
  },
  label: {
    fontSize: '12px',
  },
};