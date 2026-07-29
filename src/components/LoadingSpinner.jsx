const LoadingSpinner = ({ fullPage = false }) => {
  if (fullPage) {
    return (
      <div className="page-loader">
        <div className="spinner-content">
          <div className="spinner"></div>
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
