export default function ProgressBar({ current, total, label }) {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  const getColor = (percent) => {
    if (percent < 33) return '#FF6B6B';
    if (percent < 66) return '#FFE66D';
    return '#6BCB77';
  };

  return (
    <div style={styles.container}>
      {label && <p style={styles.label}>{label}</p>}
      <div style={styles.barBackground}>
        <div
          style={{
            ...styles.barFill,
            width: `${percentage}%`,
            backgroundColor: getColor(percentage),
          }}
        />
      </div>
      <p style={styles.count}>{current}/{total} ⭐</p>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
  },
  label: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '8px',
    textAlign: 'center',
  },
  barBackground: {
    width: '100%',
    height: '30px',
    backgroundColor: '#e0e0e0',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.1)',
  },
  barFill: {
    height: '100%',
    borderRadius: '15px',
    transition: 'width 0.4s ease, background-color 0.4s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  },
  count: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#666',
    marginTop: '8px',
    textAlign: 'center',
  },
};