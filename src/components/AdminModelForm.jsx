import { useState } from 'react';
import { addModel } from '../services/modelService';
import { validateYoutubeUrl, validateFigureLabel, sanitizeInput } from '../utils/validators';

const AdminModelForm = ({ onModelAdded }) => {
  const [figureLabel, setFigureLabel] = useState('');
  const [title, setTitle] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      if (!validateFigureLabel(figureLabel)) {
        throw new Error('Please enter a figure label (e.g., Fig 2.1)');
      }
      if (!validateYoutubeUrl(youtubeUrl)) {
        throw new Error('Please enter a valid YouTube URL.');
      }
      if (!imageUrl.trim()) {
        throw new Error('Please enter the book diagram image URL.');
      }

      // Basic URL validation for image
      try {
        new URL(imageUrl.trim());
      } catch {
        throw new Error('Please enter a valid image URL (must start with http:// or https://)');
      }

      setLoading(true);
      const sanitizedLabel = sanitizeInput(figureLabel);
      const sanitizedTitle = sanitizeInput(title);
      const sanitizedYoutubeUrl = sanitizeInput(youtubeUrl);
      const sanitizedImageUrl = imageUrl.trim();

      await addModel({
        figureLabel: sanitizedLabel,
        title: sanitizedTitle,
        youtubeUrl: sanitizedYoutubeUrl,
        imageUrl: sanitizedImageUrl,
      });
      
      setSuccess('Model added successfully! 🎉');
      setFigureLabel('');
      setTitle('');
      setYoutubeUrl('');
      setImageUrl('');
      
      if (onModelAdded) {
        onModelAdded();
      }

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message || 'Failed to add model.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-model-form">
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem' }}>
        Add New Soap Model
      </h2>
      
      {error && <div className="alert alert-error">⚠️ {error}</div>}
      {success && <div className="alert alert-success">✅ {success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Figure Label *</label>
          <input className="form-input" placeholder="e.g., Fig 2.1" value={figureLabel} onChange={(e) => setFigureLabel(e.target.value)} required />
        </div>
        
        <div className="form-group">
          <label className="form-label">Title (Optional)</label>
          <input className="form-input" placeholder="e.g., Hexagonal Prism" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        
        <div className="form-group">
          <label className="form-label">YouTube Video URL *</label>
          <input className="form-input" placeholder="https://www.youtube.com/watch?v=..." value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} required />
        </div>
        
        <div className="form-group">
          <label className="form-label">Book Diagram Image URL *</label>
          <input className="form-input" placeholder="https://i.ibb.co/..." value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
          <p style={{ marginTop: '0.5rem', color: 'var(--text-tertiary)', fontSize: '0.8rem', lineHeight: 1.5 }}>
            💡 Upload your image on <a href="https://imgbb.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)' }}>imgbb.com</a> (free) → Copy the "Direct link" → Paste it here
          </p>

          {/* Image preview */}
          {imageUrl.trim() && (
            <div style={{ marginTop: '1rem', background: 'var(--surface)', borderRadius: 'var(--radius-md)', padding: '12px', border: '1px solid var(--glass-border)' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Preview:</p>
              <img 
                src={imageUrl.trim()} 
                alt="Preview" 
                style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain', borderRadius: 'var(--radius-sm)' }}
                onError={(e) => { e.target.style.display = 'none'; }}
                onLoad={(e) => { e.target.style.display = 'block'; }}
              />
            </div>
          )}
        </div>
        
        <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Adding...' : '🚀 Add Model'}
        </button>
      </form>
    </div>
  );
};

export default AdminModelForm;
