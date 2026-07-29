import { useState } from 'react';
import { getYoutubeThumbnailUrl } from '../utils/helpers';

export default function ModelCard({ model, index }) {
  const [showContact, setShowContact] = useState(false);

  // Format label nicely (e.g. "Fig 2.1" or "2.1")
  const displayLabel = model.figureLabel.toLowerCase().includes('fig') 
    ? model.figureLabel 
    : `Figure ${model.figureLabel}`;

  return (
    <div className="model-card fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
      {/* 1. Single prominent header at the top of the row (floor) */}
      <div className="model-card-header">
        <h3 className="model-card-header-title">
          <span className="model-card-badge">🧼 Model Reference</span>
          <span className="gradient-text">{displayLabel}</span>
        </h3>

        <button
          className="model-card-help-btn"
          onClick={() => setShowContact(!showContact)}
          style={{
            padding: '8px 20px',
            background: showContact ? 'var(--gradient-success)' : 'var(--gradient-accent)',
            border: 'none',
            borderRadius: 'var(--radius-full)',
            color: 'white',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all var(--transition-normal)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            whiteSpace: 'nowrap',
          }}
        >
          {showContact ? '📞' : '🤝'} {showContact ? 'Close Contact' : 'Get Help for This Model'}
        </button>
      </div>

      {/* 2. Contact popup (reveals directly below the header) */}
      {showContact && (
        <div 
          className="model-card-contact"
          style={{
            padding: '16px 24px',
            background: 'linear-gradient(135deg, rgba(6, 214, 160, 0.1) 0%, rgba(34, 197, 94, 0.1) 100%)',
            borderBottom: '1px solid rgba(6, 214, 160, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            animation: 'fadeInUp 0.3s ease forwards',
          }}
        >
          <div>
            <p style={{ color: 'var(--accent-green)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '4px' }}>
              📞 Call: <a href="tel:9454947065" style={{ color: 'var(--accent-green)', textDecoration: 'underline' }}>9454947065</a>
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              Call me on this number, I will definitely help you — at free of cost! 🙌
            </p>
          </div>
          <a
            href="tel:9454947065"
            style={{
              padding: '10px 24px',
              background: 'var(--gradient-success)',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
            }}
          >
            📱 Call Now
          </a>
        </div>
      )}

      {/* 3. The card body (the "floor") containing Textbook Diagram and Soap Video side-by-side */}
      <div className="model-card-inner">
        {/* Left column: Textbook Diagram */}
        <div className="model-card-image-side">
          <span className="model-card-type-label">📖 Textbook Diagram</span>
          <img src={model.imageUrl} alt={`${displayLabel} - Book Diagram`} loading="lazy" />
        </div>
        
        {/* Right column: Soap Model Video Thumbnail Link */}
        <div className="model-card-video-side">
          <span className="model-card-type-label">🎥 Soap Model Video</span>
          <a 
            href={model.youtubeUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="model-card-video-link-wrapper"
          >
            <img 
              src={getYoutubeThumbnailUrl(model.youtubeUrl)} 
              alt={`${displayLabel} - Soap Model Video Thumbnail`} 
              loading="lazy"
            />
            <div className="model-card-video-overlay">
              <div className="youtube-play-btn">
                <span>▶</span> Watch Video on YouTube
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
