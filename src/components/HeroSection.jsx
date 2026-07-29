export default function HeroSection() {
  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="hero-glow-1"></div>
      <div className="hero-glow-2"></div>
      
      <div className="hero-content fade-in-up">
        <div className="hero-badge">
          <span className="hero-badge-dot"></span>
          UIET CSJMU • Engineering Drawing
        </div>
        
        <h1 className="hero-title">
          Your <span className="gradient-text">Soap Model</span> Assignment Made Easy
        </h1>
        
        <p className="hero-description">
          Confused about how to make your Engineering Drawing soap model? 
          Don't worry! See exactly how the finished models look, 
          learn the process, and get free guidance whenever you need it.
        </p>

        {/* Free help badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 22px',
          background: 'linear-gradient(135deg, rgba(6, 214, 160, 0.15) 0%, rgba(34, 197, 94, 0.15) 100%)',
          border: '1px solid rgba(6, 214, 160, 0.3)',
          borderRadius: 'var(--radius-full)',
          marginBottom: '2rem',
          fontSize: '0.9rem',
          color: 'var(--accent-green)',
          fontWeight: 600,
        }}>
          ✅ 100% Free Guidance • No Charges
        </div>
        
        <div className="hero-cta">
          <a href="#gallery" className="btn-primary" onClick={(e) => handleScrollTo(e, 'gallery')}>See Model Samples ↓</a>
          <a href="#notice" className="btn-secondary" onClick={(e) => handleScrollTo(e, 'notice')}>Know More</a>
        </div>
        
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-number gradient-text">50+</div>
            <div className="hero-stat-label">Students Helped</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number gradient-text">100%</div>
            <div className="hero-stat-label">Accuracy</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number gradient-text">FREE</div>
            <div className="hero-stat-label">Guidance</div>
          </div>
        </div>
      </div>
    </section>
  );
}
