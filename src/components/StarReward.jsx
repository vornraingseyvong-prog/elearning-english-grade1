import { useState, useEffect } from 'react';

export default function StarReward({ show, message = 'Great Job!' }) {
  const [visible, setVisible] = useState(false);
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      setBounce(true);
      const timer = setTimeout(() => setBounce(false), 600);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <div style={styles.overlay}>
      <div
        style={{
          ...styles.container,
          animation: bounce ? 'bounce 0.6s ease' : 'none',
        }}
      >
        <span style={styles.star}>⭐</span>
        <p style={styles.message}>{message}</p>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  container: {
    backgroundColor: '#FFE66D',
    borderRadius: '30px',
    padding: '40px 60px',
    textAlign: 'center',
    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
    border: '5px solid #fff',
  },
  star: {
    fontSize: '80px',
    display: 'block',
    marginBottom: '10px',
  },
  message: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
    margin: 0,
  },
};