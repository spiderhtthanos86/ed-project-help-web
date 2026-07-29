import { useState } from 'react';
import { getYoutubeThumbnailUrl } from '../utils/helpers';

export default function ModelCard({ model, index }) {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="model-card fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="model-card-inner">
        {/* Left side: Book Diagram Image */}
        <div className="model-card-image-side">
          <span className="model-card-label">{model.figureLabel}</span>
          <span className="model-card-type-label">📖 Book Diagram</span>
          <img src={model.imageUrl} alt={`${model.figureLabel} - Book Diagram`} loading="lazy" />
        </div>
        
        {/* Right side: YouTube Video (Clean Thumbnail + Link) */}
        <div className="model-card-video-side">
          <span className="model-card-label">{model.figureLabel}</span>
          <span className="model-card-type-label">🎥 Soap Model Video</span>
          <a 
            href={model.youtubeUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="model-card-video-link-wrapper"
          >
            <img 
              src={getYoutubeThumbnailUrl(model.youtubeUrl)} 
              alt={`${model.figureLabel} - Soap Model Video Thumbnail`} 
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
      
      {/* Bottom bar with title and help button */}
      <div className="model-card-title">
        <h3>Soap Model for {model.figureLabel}</h3>
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
          {showContact ? '📞' : '🤝'} {showContact ? 'Contact Info' : 'Get Help for This Model'}
        </button>
      </div>

      {/* Contact popup */}
      {showContact && (
        <div 
          className="model-card-contact"
          style={{
            padding: '16px 24px',
            background: 'linear-gradient(135deg, rgba(6, 214, 160, 0.1) 0%, rgba(34, 197, 94, 0.1) 100%)',
            borderTop: '1px solid rgba(6, 214, 160, 0.2)',
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
    </div>
  );
}
